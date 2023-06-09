module.exports = function makeCreateEmployeeController({
  Joi,
  companyExists,
  createEmployeeFunction,
  fetchCompanyIdByCompanyName,
  employeeEmailExists,
}) {
  return async function createEmployeeController(req, res) {
    console.log("Entering create employee Controller with input as ", req.body);
    try {
      validInput(req.body);
      const employee_name = req.body.employee_name;
      const role = req.body.role;
      const company_name = req.body.company_name;
      const employee_email = req.body.employee_email;
      const password = req.body.password;

      const database_name = req.headers["database_name"];

      const employee_email_exists = await employeeEmailExists({
        employee_email,
        database_name,
      });
      console.log("employee_email_exists", employee_email_exists);
      if (employee_email_exists) {
        console.info("Employee with this email Already Exists");
        res
          .status(403)
          .json({
            message: "Employee with this email Already Exists.",
          });
      } else {
        const company_exists = await companyExists({ company_name });
        console.log("company_exists", company_exists);

        if (company_exists) {
          const company_id = await fetchCompanyIdByCompanyName({
            company_name,
          });
          console.log(company_id);

          const employeeID = await createEmployeeFunction({
            employee_name,
            role,
            company_id,
            company_name,
            employee_email,
            password,
            database_name,
          });

          console.info("Create Employee Controller", employeeID);

          res.status(201).json({
            status: "Success",
            messege: "Employee Created",
          });
        } else {
          console.info("Company Entered Dose not exists");
          res
            .status(403)
            .json({ message: "Company with this name does not exist" });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "Error",
        messege: error.message,
      });
    }
  };
  function validInput(body) {
    const schema = Joi.object().keys({
      employee_name: Joi.string().required(),
      role: Joi.string().required(),
      company_name: Joi.string().required(),
      employee_email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(body);
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

const { number } = require("joi");

module.exports = function makeUpdateEmployeeController({
  Joi,
  employeeExists,
  companyExists,
  fetchCompanyIdByCompanyName,
  updateEmployee,
}) {
  return async function createUpdateEmployeeFunction(req, res) {
    console.info(`Inside update employee use case`);
    const employee_id = req.params.employee_id;
    const employee_name = req.body.employee_name;
    const role = req.body.role;
    const company_name = req.body.company_name;
    const database_name = req.headers["database_name"];

    validateInput({ employee_name, role, company_name, employee_id });
    const employee_exists = await employeeExists({
      employee_id,
      database_name,
    });
    console.log("employee_exists", employee_exists);

    if (employee_exists) {

      const company_exists = await companyExists({ company_name });
      console.log("company_exists", company_exists);

      if (company_exists) {
        try {
          if (company_exists) {
            const company_id = await fetchCompanyIdByCompanyName({
              company_name,
            });
            console.log(company_id);

            await updateEmployee({
              employee_id,
              employee_name,
              role,
              company_id,
              company_name,
              database_name,
            });

            console.info("Update Employee Controller");

            res.status(201).json({
              status: "Success",
              messege: "Employee Updated",
            });
          } else {
            console.info("Company Entered Dose not exists");
          }
        } catch (error) {
          res.status(500).json({
            status: "Error",
            messege: error.message,
          });
        }
      }
    } else {
      console.info("Employee Entered Dose not exists");
    }
    function validateInput(body) {
      const schema = Joi.object().keys({
        employee_name: Joi.string().required(),
        employee_id: Joi.number().integer().required(),
        role: Joi.string().required(),
        company_name: Joi.string().required(),
      });

      const { error } = schema.validate(body);
      if (error) {
        console.error(error);
        throw new Error(`${error.details[0].message}`);
      }
    }
  };
};

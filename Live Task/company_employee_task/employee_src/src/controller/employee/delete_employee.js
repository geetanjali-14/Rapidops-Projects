module.exports = function makeDeleteEmployeeController({
  Joi,
  employeeExists,
  deleteEmployee,
}) {
  return async function createDeleteEmployeeController(req, res) {
    console.log(
      "Entering delete employee Controller with input as ",
      req.params
    );
    try {
      validInput(req.params);
      const employee_id = req.params.employee_id;
      const database_name = req.headers["database_name"];

      const employee_exists = await employeeExists({employee_id,database_name})
      console.log("employee_exists",employee_exists);

      if (employee_exists) {
        await deleteEmployee({
          employee_id,
          database_name,
        });

        console.info("delete Employee Controller");

        res.status(201).json({
          status: "Success",
          messege: "Employee deleted",
        });
      } else {
        console.info("Employee Entered Dose not exists");
      }
    } catch (error) {
      res.status(500).json({
        status: "Error",
        messege: error.message,
      });
    }
  };
  function validInput(params) {
    const schema = Joi.object().keys({
      employee_id: Joi.number().integer().required(),
    });

    const { error } = schema.validate(params);
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

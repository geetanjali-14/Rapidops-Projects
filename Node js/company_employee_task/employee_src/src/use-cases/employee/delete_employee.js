module.exports = function makeDeleteEmployeeUseCase({ Joi, employeeDB }) {
    return async function createDeleteEmployeeFunction({
      employee_id,
      database_name,
    }) {
      console.info(`Inside delete employee use case`);
      validateInput( {employee_id});
      try {
        console.log("delete employee use-case");
        const result = await employeeDB.deleteEmployee({
          employee_id,
          database_name,
        });
        console.log("Exiting delete employee Usecase");
        return result;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
    
    function validateInput( {employee_id}) {
      const schema = Joi.object({
        employee_id: Joi.number().integer().required(),
      });
  
      const { error } = schema.validate(
        {employee_id},
      );
      if (error) {
        console.error(error);
        throw new Error(`${error.details[0].message}`);
      }
    }
  };
  
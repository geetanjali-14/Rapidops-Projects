module.exports = function makeGetEmployeeIdByEmployeeEmailUseCase({
    Joi,
    employeeDB,
    ValidationError,
  }) {
    return async function createGetEmployeeIdByEmployeeEmail({
      employee_email,
      database_name,
    }) {
      console.info(`Inside get ${employee_email} employee list use case`);
      validateInput({ employee_email });
      try {
        console.log("get company's employee use-case");
          const result = await employeeDB.getEmployeeIdByEmployeeEmail({
            employee_email,
            database_name,
          });
          console.log(
            "Exiting get employee id by employee email Usecase",
            result
          );
          return result;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
    function validateInput({ employee_email }) {
      const schema = Joi.object({
        employee_email: Joi.string().required().messages({
          "string.base": '"employee_email" must be a string',
        }),
      });
      const { error } = schema.validate({
        employee_email,
      });
      if (error) {
        console.error(error);
        throw new ValidationError(`${error.details[0].message}`);
      }
    }
  };
  
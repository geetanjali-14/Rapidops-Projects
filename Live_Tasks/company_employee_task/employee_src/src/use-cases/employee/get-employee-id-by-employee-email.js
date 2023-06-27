module.exports = function makeGetEmployeeIdByEmployeeEmail({
    Joi,
    employeeDB,
    ValidationError,
  }) {
    return async function createGetEmployeeIdByEmployeeEmail({
      employeeEmail,
    }) {
      console.info(`Inside get ${employeeEmail} employee list use case`);
      validateInputData({ employeeEmail });
      try {
        console.log("get company's employee use-case");
          return await employeeDB.getEmployeeIdByEmployeeEmail({
            employeeEmail,
          });
          
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
    function validateInputData({ employeeEmail }) {
      const schema = Joi.object({
        employeeEmail: Joi.string().required().messages({
          "string.base": '"employeeEmail" must be a string',
        }),
      });
      const { error } = schema.validate({
        employeeEmail,
      });
      if (error) {
        console.error(error);
        throw new ValidationError(`${error.details[0].message}`);
      }
    }
  };
  
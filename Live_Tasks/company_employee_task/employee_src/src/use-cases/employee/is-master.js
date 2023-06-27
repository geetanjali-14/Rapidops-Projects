module.exports = function makeIsMaster({ Joi, employeeDB,ValidationError}) {
    return async function createIsMaster({ employeeId }) {
      console.info(`Inside checking employee's verification use case`);
      validateInputData({
        employeeId,
      });
  
      try {
        console.log("Checking isMaster use-case");
        return await employeeDB.isMaster({
          employeeId,
        });
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  
    function validateInputData({ employeeId }) {
      const schema = Joi.object({
        employeeId: Joi.number().required().messages({
          "number.base": '"employeeId" must be a number',
        }),
      });
      const { error } = schema.validate({
        employeeId,
      });
      if (error) {
        console.error(error);
        throw new ValidationError(`${error.details[0].message}`);
      }
    }
  };
  
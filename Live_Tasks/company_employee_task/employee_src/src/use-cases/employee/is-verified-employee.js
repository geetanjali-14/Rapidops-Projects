module.exports = function makeIsVerifiedEmployee({ Joi, employeeDB,ValidationError}) {
  return async function createIsVerifiedEmployee({ employeeId }) {
    console.info(`Inside checking employee's verification use case`);
    validateInputData({
      employeeId,
    });

    try {
      console.log("Checking employee's verification use-case");
      return await employeeDB.isVerifiedEmployee({
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

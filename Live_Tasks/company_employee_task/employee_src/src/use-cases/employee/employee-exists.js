module.exports = function makeEmployeeExists({
  Joi,
  employeeDB,
  ValidationError,
}) {
  return async function createEmployeeExists({ employeeId }) {
    console.info(`Inside employee exists use case`);
    validateInputData({ employeeId });
    try {
      console.log("Employee exists use-case");

      return await employeeDB.employeeExists({
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

    const { error } = schema.validate({ employeeId });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

module.exports = function makeEmployeeEmailExists({
  Joi,
  employeeDB,
  ValidationError,
}) {
  return async function employeeEmailExists({ employeeEmail }) {
    console.info(employeeEmail);
    validateInputData({ employeeEmail });
    try {
      return await employeeDB.employeeEmailExists({
        employeeEmail,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  function validateInputData({ employeeEmail }) {
    const schema = Joi.object({
      employeeEmail: Joi.string().email().required().messages({
        "string.email": '"employeeEmail" must be a valid email address',
        "any.required": '"employeeEmail" is required',
      }),
    });

    const { error } = schema.validate({ employeeEmail });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

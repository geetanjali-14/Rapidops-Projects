module.exports = function makeupdateEmployeeVerificationToken({
  Joi,
  employeeDB,
  ForbiddenError,
  ValidationError,
  createEmployeeEmailExists,
}) {
  return async function createupdateEmployeeVerificationToken({
    employeeEmail,
    verificationToken,
  }) {
    console.info(`Inside update employee verification token use case`);
    validateInputData({ employeeEmail, verificationToken });

    try {
      console.log("Update employee verification token use-case");
      const employeeExistsResult = await createEmployeeEmailExists({
        employeeEmail,
      });

      console.log("employee_exists", employeeExistsResult);

      if (!employeeExistsResult) {
        console.info("Employee does not exist");
        throw new ForbiddenError("Employee does not exist");
      }

      return await employeeDB.updateVerificationStatus({
        employeeEmail,
        verificationToken,
      });

    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function validateInputData({ employeeEmail, verificationToken }) {
    const schema = Joi.object({
      employeeEmail: Joi.string().required(),
      verificationToken: Joi.string().required(),
    });

    const { error } = schema.validate({ employeeEmail, verificationToken });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

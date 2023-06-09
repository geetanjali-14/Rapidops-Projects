module.exports = function makeupdateEmployeeVerificationTokenUseCase({
  Joi,
  employeeDB,
  ForbiddenError,
  ValidationError,
  createEmployeeEmailExistsUseCase,
}) {
  return async function createupdateEmployeeVerificationToken({
    employee_email,
    verification_token,
    database_name,
  }) {
    console.info(`Inside update employee verification token use case`);
    validateInput({ employee_email, verification_token });
    try {
      console.log("update employee verification token use-case");
      const employee_exists = await createEmployeeEmailExistsUseCase({
        employee_email,
        database_name,
      });
      console.log("employee_exists", employee_exists);

      if (employee_exists) {
        const result = await employeeDB.updateVerificationStatus({
          employee_email,
          verification_token,
          database_name,
        });
        console.log("Exiting update employee verification token use case");
        return result;
      } else {
        console.info("Employee Entered Dose not exists");
        throw new ForbiddenError("Employee Entered Dose not exists");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function validateInput({ employee_email ,verification_token}) {
    const schema = Joi.object({
      employee_email: Joi.string().required(),
      verification_token: Joi.string().required(),
    });

    const { error } = schema.validate({ employee_email,verification_token });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

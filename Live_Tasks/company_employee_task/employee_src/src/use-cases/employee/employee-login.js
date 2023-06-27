module.exports = function makeEmployeeLogin({
  Joi,
  ValidationError,
  InvalidAccessError,
  employeeDB,
  isVerifiedEmployee,
  employeeEmailExists,
  getEmployeeIdByEmployeeEmail,
  generateAccessToken,
}) {
  return async function createEmployeeLogin({ employeeEmail, password }) {
    try {
      validateInputData({ employeeEmail, password });

      const employeeExistsResult = await employeeEmailExists({
        employeeEmail,
      });

      if (!employeeExistsResult) {
        throw new ObjectNotFoundError("Employee does not exist");
      }

      const employeeId = await getEmployeeIdByEmployeeEmail({
        employeeEmail,
      });

      const isVerifiedEmployeeResult = await isVerifiedEmployee({
        employeeId,
      });
      
      
      if (!isVerifiedEmployeeResult) {
        throw new InvalidAccessError("Employee is not a verified user");
      }
      
      const authenticated = await employeeDB.authenticateEmployee({
        employeeEmail,
        password,
      });
      if (!authenticated) {
        throw new InvalidAccessError("Wrong credentials");
      }
      return await generateAccessToken({ employeeId });
    } catch (error) {
      throw error;
    }
  };

  function validateInputData({ employeeEmail, password }) {
    const schema = Joi.object().keys({
      employeeEmail: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({ employeeEmail, password });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

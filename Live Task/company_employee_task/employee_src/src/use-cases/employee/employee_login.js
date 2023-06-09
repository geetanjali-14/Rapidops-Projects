module.exports = function makeEmployeeLoginUseCase({
  Joi,
  employeeEmailExists,
  isVerifiedEmployee,
  ValidationError,
  employeeDB,
  createGetEmployeeIdByEmployeeEmailUseCase,
  generateAccessToken,
}) {
  return async function createEmployeeLoginUseCase({
    employee_email,
    password,
    database_name,
  }) {
    console.log("Entering employee login UseCase with input as ");
    try {
      validInput({ employee_email, password, database_name });

      const employee_exists = await employeeEmailExists({
        employee_email,
        database_name,
      });
      console.log("employee_exists in use case", employee_exists);

      // Employee Exists
      if (employee_exists) {
        const employee_id = await createGetEmployeeIdByEmployeeEmailUseCase({
          employee_email,
          database_name,
        });
        console.log(employee_id);
        const is_verified_employee = await isVerifiedEmployee({
          employee_id,
          database_name,
        });

        // Employee is a verified employee
        if (is_verified_employee) {
          await employeeDB.authenticateEmployee({
            employee_email,
            password,
            database_name,
          });
          console.info("Login Employee UseCase ");

          const result = await generateAccessToken({ employee_id });
          return {
            statusCode: 200,
            message: "Employee Logged In",
            result: result,
          };
        } else {
          console.info("Employee Entered is not a verified user");
          return {
            statusCode: 401,
            message: "Employee is not a verified user",
          };
        }
      } else {
        console.info("Employee Entered Does not exist");
        return {
          statusCode: 404,
          message: "Employee does not exist",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        message: error.message,
      };
    }
  };

  function validInput({ employee_email, password }) {
    const schema = Joi.object().keys({
      employee_email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ employee_email, password });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

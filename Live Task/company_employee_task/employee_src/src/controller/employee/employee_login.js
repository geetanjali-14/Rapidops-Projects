module.exports = function makeEmployeeLoginController({
  Joi,
  employeeEmailExists,
  isVerifiedEmployee,
  employeeLogin,
  getEmployeeIdByEmployeeEmail,
  insertAccessToken,
}) {
  return async function createEmployeeLoginController(req, res) {
    console.log("Entering employee login Controller with input as ", req.body);
    try {
      validInput(req.body);
      const employee_email = req.body.employee_email;
      const password = req.body.password;
      const database_name = req.headers["database_name"];

      const employee_exists = await employeeEmailExists({
        employee_email,
        database_name,
      });
      console.log("employee_exists", employee_exists);

      // Employee Exists
      if (employee_exists) {
        const employee_id = await getEmployeeIdByEmployeeEmail({
          employee_email,
          database_name,
        });

        const is_verified_employee = await isVerifiedEmployee({
          employee_id,
          database_name,
        });

        // Employee is verified employee ?
        if (is_verified_employee) {
          const result = await employeeLogin({
            employee_email,
            password,
            database_name,
          });

          const access_token = result.result.access_token;
          const access_token_details = result.result;
          console.info("Login Employee Controller with access_token ");

          await insertAccessToken({
            employee_id,
            access_token_details,
            database_name,
          });

          res.status(200).json({
            status: "Success",
            message: "Employee Logged In",
            access_token: access_token,
          });
        } else {
          console.info("Employee Entered is not a verified user");
          res.status(401).json({
            status: "Unauthorized",
            message: "Employee is not a verified user",
          });
        }
      } else {
        console.info("Employee Entered Does not exist");
        res.status(404).json({
          status: "Not Found",
          message: "Employee does not exist",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };

  function validInput(body) {
    const schema = Joi.object().keys({
      employee_email: Joi.string().required(),
      password: Joi.string().required().messages({
        "string.base": '"password" must be a string',
      }),
    });

    const { error } = schema.validate(body);
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

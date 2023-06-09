module.exports = function makeDeleteEmployeeController({
  Joi,
  employeeExists,
  deleteEmployee,
  isVerifiedEmployee,
  accessTokenExists,
  accessTokenExpirationTime,
  updateAccessTokenTime,
}) {
  return async function createDeleteEmployeeController(req, res) {
    console.log(
      "Entering delete employee Controller with input as ",
      req.params
    );
    try {
      validInput(req.params);
      const employee_id = req.params.employee_id;
      const access_token = req.body.access_token;
      const database_name = req.headers["database_name"];

      const employee_exists = await employeeExists({
        employee_id,
        database_name,
      });
      console.log("employee_exists", employee_exists);

      if (employee_exists) {
        const is_verified_employee = await isVerifiedEmployee({
          employee_id,
          database_name,
        });

        if (is_verified_employee) {
          const access_token_exists = await accessTokenExists({
            access_token,
            database_name,
          });
          console.log(access_token_exists);

          if (access_token_exists) {
            const access_token_expiration_time =
              await accessTokenExpirationTime({
                access_token,
                database_name,
              });

            console.log(Date.parse(access_token_expiration_time), Date.now());
            if (Date.parse(access_token_expiration_time) >= Date.now()) {
              await deleteEmployee({
                employee_id,
                database_name,
              });

              console.info("delete Employee Controller");

              res.status(200).json({
                status: "Success",
                message: "Employee deleted",
              });
            } else {
              console.log("access_token has expired.");
              const updated_expiration_time = new Date();
              updated_expiration_time.setHours(
                updated_expiration_time.getHours() + 1
              );

              await updateAccessTokenTime({
                access_token,
                updated_expiration_time,
                database_name,
              });
              res.status(401).json({
                status: "Unauthorized",
                message: "Access token time updated.",
              });
            }
          } else {
            console.log("access_token does not exist.");
            res.status(401).json({
              status: "Unauthorized",
              message: "Access token does not exist",
            });
          }
        } else {
          console.info("Employee entered is not a verified user");
          res.status(401).json({
            status: "Unauthorized",
            message: "Employee is not a verified user",
          });
        }
      } else {
        console.info("Employee entered does not exist");
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

  function validInput(params) {
    const schema = Joi.object().keys({
      employee_id: Joi.number().integer().required(),
    });

    const { error } = schema.validate(params);
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

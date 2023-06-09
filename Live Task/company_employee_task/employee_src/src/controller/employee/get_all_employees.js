module.exports = function makeGetAllEmployeesController({
  Joi,
  getAllEmployees,
  accessTokenExists,
  accessTokenExpirationTime,
  updateAccessTokenTime,
}) {
  return async function createGetAllEmployeesController(req, res) {
    console.info(`Inside get all employee list controller`);
    const access_token = req.body.access_token;
    const database_name = req.headers["database_name"];
    try {
      console.log("get all employee controller");

      const access_token_exists = await accessTokenExists({
        access_token,
        database_name,
      });
      console.log(access_token_exists);

      if (access_token_exists) {
        const access_token_expiration_time = await accessTokenExpirationTime({
          access_token,
          database_name,
        });

        console.log(Date.parse(access_token_expiration_time), Date.now());
        if (Date.parse(access_token_expiration_time) >= Date.now()) {
          const result = await getAllEmployees({
            database_name,
          });

          console.log(
            "Exiting get all employee list in employees controller.",
            result
          );
          res.status(200).json({
            status: "Success",
            message: "Employee list retrieved successfully",
            data: result,
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
        console.log("access_token does not exists.");
        res.status(401).json({
          status: "Unauthorized",
          message: " access token does not exists",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "Error",
        message: err.message,
      });
    }
  };
};

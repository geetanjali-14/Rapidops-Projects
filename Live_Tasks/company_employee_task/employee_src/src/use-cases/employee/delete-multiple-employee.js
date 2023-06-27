module.exports = function makeDeleteMultipleEmployees({
  Joi,
  employeeDB,
  ValidationError,
  InvalidAccessError,
  ObjectNotFoundError,
  accessTokenExists,
  accessTokenExpirationTime,
  getEmployeeIdFromAccessToken,
}) {
  return async function createDeleteMultipleEmployees({ accessTokens }) {
    console.info(`Inside delete multiple employees use case`);
    validateInputData({ accessTokens });

    try {
      console.log("Delete multiple employee use-case");
      const validEmployeeIds = [];
      for (let accessToken of accessTokens) {
        const accessTokenExistsResult = await accessTokenExists({
          accessToken,
        });
        if (accessTokenExistsResult) {
          const accessTokenExpirationTimeResult =
            await accessTokenExpirationTime({ accessToken });
          if (Date.parse(accessTokenExpirationTimeResult) >= Date.now()) {
            const employeeId = await getEmployeeIdFromAccessToken({
              accessToken,
            });
            const isMasterResult = await isMaster({ employeeId });
            if (isMasterResult) {
              await employeeDB.assignOtherEmployeeMasterWhenMasterDeletes();
            }
            validEmployeeIds.push(employeeId);
          } else {
            console.log("Access token has expired.");
            throw new InvalidAccessError(`Expired access token`);
          }
        } else {
          console.log(`Access token ${accessToken} does not exist.`);
          throw new ObjectNotFoundError(`Invalid access token`);
        }
      }
      return await employeeDB.deleteMultipleEmployees({ validEmployeeIds });
    } catch (err) {
      throw err;
    }
  };

  function validateInputData({ accessTokens }) {
    const schema = Joi.object({
      accessTokens: Joi.array()
        .items(Joi.string().required())
        .min(1)
        .required()
        .messages({
          "string.base": 'Each "accessTokens" item must be a string',
          "array.min": 'At least one "accessTokens" must be provided',
        }),
    });

    const { error } = schema.validate({ accessTokens });
    if (error) {
      console.error(error);
      throw new ValidationError(error.details[0].message);
    }
  }
};

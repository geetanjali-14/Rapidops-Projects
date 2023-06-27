module.exports = function makeAccessTokenExistsByEmployeeId({
    Joi,
    accessTokensDB,
    ValidationError,
  }) {
    return async function accessTokenExistsByEmployeeId({
      employeeId,
    }) {
      console.log("Inside AccessTokenExists use case",employeeId);
      validateInputData({ employeeId});
      try {
        const accessToken = accessTokensDB.accessTokenExists({
            employeeId,
      });
      console.log("accessToken: ",accessToken);
        return accessToken;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
  
    function validateInputData({ employeeId}) {
      const schema = Joi.object({
        employeeId: Joi.number().integer().required(),
      });
  
      const { error } = schema.validate({ employeeId });
      if (error) {
        throw new ValidationError(`${error.details[0].message}`);
      }
    }
  };
  
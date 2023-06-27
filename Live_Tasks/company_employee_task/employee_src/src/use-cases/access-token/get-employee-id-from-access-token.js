module.exports = function makeGetEmployeeIdFromAccessToken({
    Joi,
    accessTokensDB,
    ValidationError,
  }) {
    return async function createGetEmployeeIdFromAccessToken({
      accessToken,
    }) {
      console.log("Inside getEmployeeIdFromAccessToken use case");
      validateInputData({ accessToken });
      try {
        const employee_id = accessTokensDB.getEmployeeIdFromAccessToken({
          accessToken,
      });
        return employee_id;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
  
    function validateInputData({ accessToken }) {
      const schema = Joi.object({
        accessToken: Joi.string().required().messages({
          "string.base": '"accessToken" must be a string',
        }),
      });
  
      const { error } = schema.validate({ accessToken });
      if (error) {
        throw new ValidationError(`${error.details[0].message}`);
      }
    }
  };
  
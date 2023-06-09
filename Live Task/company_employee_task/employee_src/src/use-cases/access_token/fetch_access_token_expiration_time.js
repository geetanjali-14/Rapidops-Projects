module.exports = function makeGetAccessTokenExpirationTimeUseCase({
    Joi,
    accessTokensDB,
  }) {
    return async function getAccessTokenExpirationTime({
      access_token,
      database_name,
    }) {
      console.log("Inside getAccessTokenExpirationTime use case");
      validateInput({ access_token });
      try {
        const access_token_expiration_time = accessTokensDB.fetchExpirationTime({
          access_token,
          database_name
      });
        return access_token_expiration_time;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
  
    function validateInput({ access_token }) {
      const schema = Joi.object({
        access_token: Joi.string().required().messages({
          "string.base": '"access_token" must be a string',
        }),
      });
  
      const { error } = schema.validate({ access_token });
      if (error) {
        throw new Error(`${error.details[0].message}`);
      }
    }
  };
  
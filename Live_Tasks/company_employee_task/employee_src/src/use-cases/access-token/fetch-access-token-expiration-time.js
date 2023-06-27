module.exports = function makeGetAccessTokenExpirationTime({
  Joi,
  accessTokensDB,
  ValidationError,
}) {
  return async function getAccessTokenExpirationTime({
    accessToken,
  }) {
    console.log("Inside getAccessTokenExpirationTime use case");
    validateInputData({ accessToken });
    try {
      const accessToken_expiration_time = accessTokensDB.fetchExpirationTime({
        accessToken,
      });
      return accessToken_expiration_time;
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

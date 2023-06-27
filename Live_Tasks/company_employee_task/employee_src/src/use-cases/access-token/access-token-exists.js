module.exports = function makeAccessTokenExists({
  Joi,
  accessTokensDB,
  ValidationError,
}) {
  return async function accessTokenExists({
    accessToken,
  }) {
    console.log("Inside AccessTokenExists use case");
    validateInputData({ accessToken});
    try {
      const existenceStatus = accessTokensDB.accessTokenExists({
        accessToken,
    });
      return existenceStatus;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  function validateInputData({ accessToken}) {
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

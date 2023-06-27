module.exports = function makeUpdateAccessToken({
  Joi,
  accessTokensDB,
  ValidationError,
}) {
  return async function updateAccessToken({ accessToken, updatedExpirationTime}) {
    console.log("Inside updateAccessToken use case of", accessToken,updatedExpirationTime);
    validateInputData({ accessToken ,updatedExpirationTime});
    try {
      await accessTokensDB.updateAccessToken({
        accessToken,
        updatedExpirationTime,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  function validateInputData({ accessToken,updatedExpirationTime }) {
    const schema = Joi.object({
      accessToken: Joi.string().required().messages({
        "string.base": '"accessToken" must be a string',
      }),
      updatedExpirationTime:Joi.date().required().messages({
        "date.base": '"updatedExpirationTime" must be a valid date',
      }),
    });

    const { error } = schema.validate({
      accessToken,
      updatedExpirationTime
    });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

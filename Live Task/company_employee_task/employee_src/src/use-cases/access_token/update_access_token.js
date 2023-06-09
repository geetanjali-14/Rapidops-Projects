module.exports = function makeUpdateAccessTokenUseCase({
  Joi,
  accessTokensDB,
}) {
  return async function updateAccessToken({ access_token, updated_expiration_time,database_name }) {
    console.log("Inside updateAccessToken use case of", access_token,updated_expiration_time);
    validateInput({ access_token ,updated_expiration_time});
    try {
      await accessTokensDB.updateAccessToken({
        access_token,
        updated_expiration_time,
        database_name,
      });
      return {
        statusCode: 201,
        message: "Access token updated successfully",
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  function validateInput({ access_token,updated_expiration_time }) {
    const schema = Joi.object({
      access_token: Joi.string().required().messages({
        "string.base": '"access_token" must be a string',
      }),
      updated_expiration_time:Joi.date().required().messages({
        "date.base": '"updated_expiration_time" must be a valid date',
      }),
    });

    const { error } = schema.validate({
      access_token,
      updated_expiration_time
    });
    if (error) {
      throw new Error(`${error.details[0].message}`);
    }
  }
};

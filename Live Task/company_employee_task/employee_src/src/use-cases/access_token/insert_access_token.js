module.exports = function makeInsertAccessTokenUseCase({
  Joi,
  accessTokensDB,
}) {
  return async function insertAccessToken({
    employee_id,
    access_token_details,
    database_name,
  }) {
    console.log("Inside insertAccessToken use case of", employee_id);
    const { access_token, expiration_time, created_at } = access_token_details;
    validateInput({ employee_id, access_token, expiration_time, created_at });
    try {

      await accessTokensDB.insertAccessToken({
        employee_id,
        access_token,
        expiration_time,
        created_at,
        database_name,
      });

      console.log("Access token inserted successfully");
      return {
        statusCode: 201,
        message: "Access token inserted successfully",
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  function validateInput({
    employee_id,
    access_token,
    expiration_time,
    created_at,
  }) {
    const schema = Joi.object({
      employee_id: Joi.number().required().messages({
        "number.base": '"employee_id" must be a number',
      }),
      access_token: Joi.string().required().messages({
        "string.base": '"access_token" must be a string',
      }),
      expiration_time: Joi.date().required().messages({
        "date.base": '"expiration_time" must be a valid date',
      }),
      created_at: Joi.date().required().messages({
        "date.base": '"created_at" must be a valid date',
      }),
    });

    const { error } = schema.validate({
      employee_id,
      access_token,
      expiration_time,
      created_at,
    });
    if (error) {
      throw new Error(`${error.details[0].message}`);
    }
  }
};

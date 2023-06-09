module.exports = function makeGenerateAccessTokenUseCase({ Joi, jwt, crypto }) {
  return async function generateAccessToken({ employee_id }) {
    console.log("Inside generateAccessToken use case", employee_id);
    validateInput({ employee_id });
    try {
      const secret_key = crypto.randomBytes(32).toString("hex");
      const expires_in = 60 * 60;

      function generateAccessToken(employee_id, secret_key, expires_in) {
        const payload = {
          employee_id: employee_id,
        };
        return jwt.sign(payload, secret_key, { expiresIn: expires_in });
      }

      const access_token = generateAccessToken(
        employee_id,
        secret_key,
        expires_in
      );
      const expiration_time = new Date(Date.now() + expires_in * 1000);
      const created_at = new Date();
      // console.log({ access_token, expiration_time });
      return { access_token, expiration_time, created_at};
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  function validateInput({ employee_id }) {
    const schema = Joi.object({
      employee_id: Joi.number().required().messages({
        "number.base": '"employee_id" must be a number',
      }),
    });

    const { error } = schema.validate({ employee_id });
    if (error) {
      throw new Error(`${error.details[0].message}`);
    }
  }
};

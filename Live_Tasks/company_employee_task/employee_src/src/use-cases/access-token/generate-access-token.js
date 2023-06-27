module.exports = function makeGenerateAccessToken({ Joi, jwt,ValidationError }) {
  return async function generateAccessToken({ employeeId }) {
    console.log("Inside generateAccessToken use case", employeeId);
    validateInputData({ employeeId });
    try {
      const secretKeyLength = 32;
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let secretKey = "";

      console.log("@#$%^&");
      for (let i = 0; i < secretKeyLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        secretKey += characters.charAt(randomIndex);
      }
      const expiresIn = 60 * 60;
      
      function generateAccessToken(employeeId, secretKey, expiresIn) {
        const payload = {
          employeeId: employeeId,
        };
        return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
      }

      const accessToken = generateAccessToken(
        employeeId,
        secretKey,
        expiresIn
        );
      const expirationTime = new Date(Date.now() + expiresIn * 1000);
      const createdAt = new Date();
      return { accessToken, expirationTime, createdAt };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  function validateInputData({ employeeId }) {
    const schema = Joi.object({
      employeeId: Joi.number().required().messages({
        "number.base": '"employeeId" must be a number',
      }),
    });

    const { error } = schema.validate({ employeeId });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

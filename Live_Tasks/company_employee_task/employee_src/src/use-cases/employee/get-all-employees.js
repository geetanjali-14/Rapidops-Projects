module.exports = function makeGetAllEmployee({
  Joi,
  employeeDB,
  accessTokenExists,
  accessTokenExpirationTime,
  updateAccessTokenTime,
  ForbiddenError,
  ValidationError,
}) {
  return async function createGetAllEmployee({ accessToken }) {
    console.info(`Inside get all employee list use case`);
    validateInputData({ accessToken });
    try {
      console.log("Get all employee use-case");

      const accessTokenExistsResult = await accessTokenExists({
        accessToken,
      });

      if (!accessTokenExistsResult) {
        throw new ForbiddenError("Access token does not exist");
      }

      const accessTokenExpirationTimeResult = await accessTokenExpirationTime({
        accessToken,
      });

      if (Date.parse(accessTokenExpirationTimeResult) < Date.now()) {
        console.log("Access token has expired")
        throw new ForbiddenError("Access token has expired");
      }
      
      const updatedExpirationTime = new Date();
      updatedExpirationTime.setHours(updatedExpirationTime.getHours() + 1);
      // validateExpirationTime({updatedExpirationTime})
      
      const updated=await updateAccessTokenTime({
        accessToken,
        updatedExpirationTime,
      });
      return await employeeDB.getAllEmployees();
      
    } catch (err) {
      throw err;
    }
  };
  function validateInputData({ accessToken }) {
    const schema = Joi.object().keys({
      accessToken: Joi.string().required().messages({
        "any.required": '"accessToken" is required',
      }),
    });

    const { error } = schema.validate({ accessToken });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
  // function validateExpirationTime({ updatedExpirationTime }) {
  //   const Joi = require('joi');
  //   const schema = Joi.date().iso().required();
  
  //   let expirationTime = updatedExpirationTime;
  //   if (typeof updatedExpirationTime !== 'string') {
  //     expirationTime = new Date(updatedExpirationTime).toISOString();
  //   }
  
  //   const { error } = schema.validate({ updatedExpirationTime: expirationTime });
  
  //   if (error) {
  //     console.log(error);
  //     throw new ValidationError(`${error.details[0].message}`);
  //   }
  // }
  
};

module.exports = function makeInsertAccessToken({
  Joi,
  accessTokensDB,
  ValidationError,
  updateAccessToken,
  accessTokenExistsByEmployeeId,
}) {
  return async function createInsertAccessToken({
    employeeId,
    accessTokenDetails,
    ipAddress,
    city,
    state,
    country,
    deviceName,
    browserName,
  }) {
    console.log("Inside insertAccessToken use case of", employeeId);
    const { accessToken, expirationTime, createdAt } = accessTokenDetails;
    validateInputData({
      employeeId,
      accessToken,
      expirationTime,
      createdAt,
      ipAddress,
      city,
      state,
      country,
      deviceName,
      browserName,
    });
    try {
      const accessTokenExistsResult = await accessTokenExistsByEmployeeId({
        employeeId,
      });

      if (!accessTokenExistsResult) {
       const insertedAccessTokenId= await accessTokensDB.insertAccessToken({
          employeeId,
          accessToken,
          expirationTime,
          createdAt,
          ipAddress,
          city,
          state,
          country,
          deviceName,
          browserName,
        });
        console.log("Access token inserted successfully");
        return insertedAccessTokenId;
      } else {
        const { accessToken } = accessTokenExistsResult;
        const updatedExpirationTime = new Date();
        updatedExpirationTime.setHours(updatedExpirationTime.getHours() + 1);
        return await updateAccessToken({ accessToken, updatedExpirationTime });
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  function validateInputData({
    employeeId,
    accessToken,
    expirationTime,
    createdAt,
    ipAddress,
    city,
    state,
    country,
    deviceName,
    browserName,
  }) {
    const schema = Joi.object({
      employeeId: Joi.number().required(),
      accessToken: Joi.string().required(),
      expirationTime: Joi.date().required(),
      createdAt: Joi.date().required(),
      ipAddress: Joi.string().required().ip(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      deviceName: Joi.string().required(),
      browserName: Joi.string().required(),
    });

    const { error } = schema.validate({
      employeeId,
      accessToken,
      expirationTime,
      createdAt,
      ipAddress,
      city,
      state,
      country,
      deviceName,
      browserName,
    });

    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

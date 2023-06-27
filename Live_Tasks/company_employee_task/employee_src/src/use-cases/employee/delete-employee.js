module.exports = function makeDeleteEmployee({
  Joi,
  employeeDB,
  createEmployeeExists,
  isVerifiedEmployee,
  ValidationError,
  isMaster,
  accessTokenExists,
  accessTokenExpirationTime,
  updateAccessTokenTime,
  ObjectNotFoundError,
}) {
  return async function deleteEmployee({ employeeId, accessToken }) {
    console.info(`Inside delete employee use case`);
    validateInputData({ employeeId, accessToken });

    try {
      console.log("Delete employee use-case");
      const employeeExistsResult = await createEmployeeExists({ employeeId });
      console.log("employee_exists", employeeExistsResult);

      if (!employeeExistsResult) {
        throw new ObjectNotFoundError("Employee does not exist");
      }

      const isVerifiedEmployeeResult = await isVerifiedEmployee({ employeeId });
      console.log("isVerified_Employee_Result", isVerifiedEmployeeResult);

      if (!isVerifiedEmployeeResult) {
        console.info("Employee entered is not a verified user");
        return;
      }

      const accessTokenExistsResult = await accessTokenExists({ accessToken });

      if (!accessTokenExistsResult) {
        console.log("Access token does not exist");
        return;
      }

      const accessTokenExpirationTimeResult = await accessTokenExpirationTime({
        accessToken,
      });
      

      if (Date.parse(accessTokenExpirationTimeResult) <= Date.now()) {
        console.log("Access token has expired");
        return;
      }

      const isMasterResult=await isMaster({employeeId})
      if(isMasterResult)
      {
          await employeeDB.assignOtherEmployeeMasterWhenMasterDeletes();
      }
      
      const updatedExpirationTime = new Date();
      updatedExpirationTime.setHours(updatedExpirationTime.getHours() + 1);
      
      await updateAccessTokenTime({ accessToken, updatedExpirationTime });
      
      return await employeeDB.deleteEmployee({ employeeId });
    } catch (err) {
      throw err;
    }
  };

  function validateInputData({ employeeId, accessToken }) {
    const schema = Joi.object({
      employeeId: Joi.number().required(),
      accessToken: Joi.string().required(),
    });

    const { error } = schema.validate({ employeeId, accessToken });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

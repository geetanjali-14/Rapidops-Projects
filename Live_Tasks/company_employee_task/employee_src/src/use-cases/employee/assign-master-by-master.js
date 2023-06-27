module.exports = function makeAssignMasterRoleByMaster({
  Joi,
  employeeDB,
  isMaster,
  ValidationError,
  ForbiddenError
}) {
  return async function createAssignMasterRoleByMaster({masterId,employeeId}) {
    console.log("Entering create assign master role Usecase");
    try {
      validateInputData({ employeeId, masterId });
       isMasterResult=await isMaster({masterId});
       if(!isMasterResult)
       {
        throw new ForbiddenError('Entered Id is not MasterId');
       }
       return await employeeDB.makeOtherEmployeeMaster({employeeId});
    } catch (error) {
      throw new Error(error);
    }
  };
  function validateInputData({ employeeId, masterId }) {
    const schema = Joi.object({
      employeeId: Joi.interger().number().required(),
      masterId: Joi.interger().number().required(),
    });

    const { error } = schema.validate({ employeeId, masterId });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

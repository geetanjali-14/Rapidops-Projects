module.exports = function makeAssignMasterRoleByMaster({
    assignMasterRoleByMaster
  }) {
    return async function createAssignMasterRoleByMaster(req,res) {
      console.log("Entering create assign master role Controller");
      try {
        const masterId=req.body.employeeId;
        const employeeId=req.params.employeeId;
        return await assignMasterRoleByMaster({masterId,employeeId});
      } catch (error) {
        throw new Error(error);
      }
    };
  };
  
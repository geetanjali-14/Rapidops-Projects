module.exports = function makeAssignRolesToEmployeeRoles({
  assignEmployeeRoles,
}) {
  return async function createAssignRolesToEmployeeRoles(req, res) {
    console.log("Entering assign roles  to employee controller with input as ");
    try {
      const {employeeId,assignerId} = req.body;
      let roles = req.body.roles;
      await assignEmployeeRoles({ employeeId, assignerId, roles });
      res
        .status(200)
        .json({ 
          success: true, 
          message: "Roles assigned successfully." 
        });
    } catch (error) {
      throw new Error(error);
    }
  };
};

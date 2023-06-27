module.exports = function makeAssignRolesToEmployeeRoles({
    Joi,
    isMaster,
    employeeExists,
    employeeRolesDB,
    roleExists,
    fetchRoleId,
    ValidationError,
    ObjectNotFoundError,
    InvalidAccessError
  }) {
    return async function createAssignRolesToEmployeeRoles({
      employeeId,
      assignerId,
      roles,
    }) {
      console.log("Entering Insert employee roles use case with input as ");
      try {
        validateInputData({ employeeId, assignerId, roles });
  
        const employeeExistsResult = await employeeExists({ employeeId });
        if (!employeeExistsResult) {
          throw new ObjectNotFoundError("Employee does not exist.");
        }
        const isMasterResult = await isMaster({ employeeId: assignerId });
        if (!isMasterResult) {
          throw new InvalidAccessError("You don't have valid rights to assign roles.");
        }
        
        const roleIds = [];
        for (let i = 0; i < roles.length; i++) {
          const role = roles[i];
          const roleExistsResult = await roleExists({ role });
          if (!roleExistsResult) {
            throw new ObjectNotFoundError(`Role '${role}' does not exist.`);
          }
          const roleId = await fetchRoleId({ role });
          roleIds.push(roleId);
        }
        
        return await employeeRolesDB.assignEmployeeRoles({ employeeId, roleIds });

      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    };
  
    function validateInputData({ employeeId, assignerId, roles }) {
      const schema = Joi.object({
        employeeId: Joi.number().required(),
        assignerId: Joi.number().required(),
        roles: Joi.array().items(Joi.string()).min(1).required(),
      });
      const { error } = schema.validate({ employeeId, assignerId, roles });
  
      if (error) {
        console.error(error);
        throw new ValidationError(`${error.details[0].message}`);
      }
    }
  };
  
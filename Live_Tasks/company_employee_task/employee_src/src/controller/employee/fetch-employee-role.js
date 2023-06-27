module.exports = function makeFetchEmployeeRoles({ fetchEmployeeRole, fetchRoleNamesByRoleId }) {
    return async function createFetchEmployeeRoles({ req, res }) {
      const {employeeId} = req.body;
      console.log("Entering Fetch employee roles controller with input as ");
      try {
        const roleIDs = await fetchEmployeeRole({ employeeId });
        const roleNames = [];
  
        for (const roleId of roleIDs) {
          const roleName = await fetchRoleNamesByRoleId({ roleId });
          roleNames.push(roleName);
        }
        console.log("Role names:", roleNames);
        
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    };
  };
  
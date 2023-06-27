module.exports = function makeFetchEmployeeRoles({
    fetchEmployeeRole
  }) {
    return async function createFetchEmployeeRoles({
      req,res,
    }) {
      console.log("Entering Fetch employee roles controller with input as ");
      try {
        const {employeeId} = req.body;
        return await fetchEmployeeRole({ employeeId});
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    };
  };
  
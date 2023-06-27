module.exports = function makeFetchAllRole({
    fetchAllRoles,
  }) {
    return async function createFetchAllRole(req,res) {
      console.log("Entering get all roles Controller with input as ");
      try {
          const result=await fetchAllRoles({});
          console.log("Roles: ",result)
         res.status(201).json({
          status: "Success",
          message: "Roles Fetched",
        });
      } catch (error) {
        throw new Error(error);
      }
    };
  };
  
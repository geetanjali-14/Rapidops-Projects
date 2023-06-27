module.exports = function makeFetchAllRole({
    rolesDB,
  }) {
    return async function createFetchAllRole({}) {
      console.log("Entering get all roles Usecase with input as ");
      try {
         return await rolesDB.fetchAllRoles({});
      } catch (error) {
        throw new Error(error);
      }
    };
  };
  
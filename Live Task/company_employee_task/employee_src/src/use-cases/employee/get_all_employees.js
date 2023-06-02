module.exports = function makeGetAllEmployeeUseCase({employeeDB }) {
    return async function createGetAllEmployeeFunction({
      database_name,
    }) {
      console.info(`Inside get all employee list use case`);
      try {
        console.log("get all employee use-case");
        const result = await employeeDB.getAllEmployees({
          database_name,
        });
        console.log("Exiting get all employee list in employees Usecase",result);
        return result;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };
  
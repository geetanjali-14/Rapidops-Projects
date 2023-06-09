module.exports = function employeeExistsUsecase({
  employeeDB,
  ForbiddenError
}) {
  return async function createEmployeeExistsFunction({
    employee_id,
    database_name,
  }) {
    console.info(`Inside employee exists use case`);
    try {
      console.log("Employee exists use-case");

      const employee_exists = await employeeDB.employeeExists({
        employee_id,
        database_name,
      });

      console.log("Employee exists:", employee_exists);

      if (!employee_exists) {
        console.info("Employee with this ID does not exist");
        throw new ForbiddenError("Employee with this ID does not exist");
      }

      return employee_exists;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};

module.exports = function makeIsVerifiedEmployeeUseCase({ Joi, employeeDB }) {
  return async function createIsVerifiedEmployeeFunction({
    employee_id,
    database_name,
  }) {
    console.info(`Inside checking employee's verification  use case`);
    try {
      console.log("checking employee's verification use-case");
      const result = await employeeDB.isVerifiedEmployee({
        employee_id,
        database_name,
      });
      console.log("Exiting checking employee's verification Usecase", result);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};

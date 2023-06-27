module.exports = function makeUpdateEmployee({
  updateEmployee,
}) {
  return async function createUpdateEmployee(req, res) {
    console.info(`Inside update employee controller`);
    const {employeeId} = req.params;
    const {employeeName,jobTitle,companyName} = req.body;

    try {
      await updateEmployee({
        employeeId,
        employeeName,
        jobTitle,
        companyName,
      });

      console.info("Update Employee Controller");

      res.status(200).json({
        status: "Success",
        message: "Employee Updated",
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };
};

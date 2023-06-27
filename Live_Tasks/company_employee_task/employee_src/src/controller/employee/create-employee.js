module.exports = function makeCreateEmployee({
  createEmployee,
  fetchCompanyIdByCompanyName,
}) {
  return async function createCreateEmployee(req, res) {
    console.log("Entering create employee Controller with input as ", req.body);
    try {
      const {employeeName,jobTitle,companyName,employeeEmail,password} = req.body;

      const companyId = await fetchCompanyIdByCompanyName({
        companyName,
      });
      const employeeID = await createEmployee({
        employeeName,
        jobTitle,
        companyId,
        companyName,
        employeeEmail,
        password,
      });

      console.info("Create Employee Controller", employeeID);

      res.status(201).json({
        status: "Success",
        message: "Employee created",
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };
};

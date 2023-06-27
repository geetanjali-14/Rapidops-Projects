module.exports = function makeGetEmployeesByCompanyName({
  getEmployees,
}) {
  return async function createGetEmployeesByCompanyName(req, res) {
    console.info("Inside get company's employee controller");

    const {companyName} = req.body;
    try {
      console.log(`get ${companyName} employee controller`);
      const result = await getEmployees({
        companyName,
      });
      console.log("Exiting get employee's company in employees controller", result);
      res.status(200).json({
        status: "Success",
        message: "Employees fetched successfully",
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        status: "Error",
        message: err.message,
      });
    }
  };

  
};

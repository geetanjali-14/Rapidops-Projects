module.exports = function makeUpdateEmployeeWhenCompanyTableUpdates({
  updateEmployeeWhenCompanyTableUpdates,
}) {
  return async function createUpdateEmployeeWhenCompanyTableUpdates(req, res) {
    console.info(`Inside updateEmployeeWhenCompanyDetailsChanges Controller`);
    const {companyId} = req.params;
    const {companyName} = req.body;

    try {
      console.log("update updateEmployeeWhenCompanyTableUpdates Controller");
      const result = await updateEmployeeWhenCompanyTableUpdates({
        companyId,
        companyName,
      });
      console.log("Exiting update employee Controller");
      
      res.status(200).json({
        status: "Success",
        message: "Employee updated when company table changed",
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "Error",
        message: err.message,
      });
    }
  };
};

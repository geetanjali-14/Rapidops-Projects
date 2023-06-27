module.exports = function makeDeleteEmployeesOfDeletedCompany({
  deleteEmployeeOfDeletedCompany,
}) {
  return async function createDeleteEmployeesOfDeletedCompany(req, res) {
    const {companyId} = req.params;

    console.info(`Inside delete employee when company is deleted Controller`);
    try {
      console.log("delete employee when company is deleted Controller");
      await deleteEmployeeOfDeletedCompany({
        companyId,
      });

      console.log("Exiting delete employee when company is deleted Controller");
      res.status(200).json({
        status: "Success",
        message: "Employees of the deleted company have been deleted",
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

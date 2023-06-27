module.exports = function makeUpdateCompany({
  updateCompany,
  updateCompanyDetailsInEmployeeTable,
}) {
  return async function createUpdateCompanyController(req, res) {
    try {
      const {companyId,companyName,companyEmail,address} = req.params;

        await updateCompany({ companyId, companyName, address, companyEmail });
        await updateCompanyDetailsInEmployeeTable({
          companyId,
          companyName,
          address,
        });

        res.status(200).json({
          status: "Success",
          message: "Company updated",
        });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: err.message,
      });
    }
  };
};

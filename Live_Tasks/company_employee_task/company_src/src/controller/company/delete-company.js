module.exports = function makeDeleteCompany({
  deleteCompany,
  deleteEmployeeOfDeletedCompany,
  deleteRolesOfDeletedCompany,
}) {
  return async function createDeleteCompany(req, res) {
    console.info("In delete company controller", req.params);
    try {
      const {companyId} = req.params;
      const result = await deleteCompany({ companyId });

      if (result) {
        await deleteEmployeeOfDeletedCompany({ companyId });
        await deleteRolesOfDeletedCompany({ companyId });
      }
      res.status(200).json({
        status: "Success",
        message: "Company deleted along with its employees.",
      });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: err.message,
      });
    }
  };
};

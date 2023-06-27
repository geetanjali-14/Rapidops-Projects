module.exports = function makeGetAllEmployeesOfCompany({
  getAllEmployeesOfCompany,
  companyExistsByName,
}) {
  return async function createGetAllEmployeesOfCompany(req, res) {
    try {
      const { companyName } = req.params;

      const companyExists = await companyExistsByName({ companyName });

      if (companyExists) {
        const employeeNames = await getAllEmployeesOfCompany({ companyName });
        res.status(200).json({
          status: "Success",
          message: "Company's employees fetched",
          employeeNames,
        });
      } else {
        res.status(404).json({
          status: "Error",
          message: `Company '${companyName}' does not exist`,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };
};

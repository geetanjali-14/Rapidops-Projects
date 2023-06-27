module.exports = function makeGetCompanyEmailByCompanyId({
  getCompanyEmailByCompanyId,
  companyExists,
}) {
  return async function createGetCompanyEmailByCompanyId(req, res) {
    const { companyId } = req.params;

    const companyIdExistsResult = await companyExists({ companyId });

    if (companyIdExistsResult) {
      const companyEmail = await getCompanyEmailByCompanyId({ companyId });
      res.status(200).json({
        status: "Success",
        message: "Company email fetched",
        companyEmail,
      });
    } else {
      console.log("Company ID doesn't exist");
      res.status(404).json({
        status: "Error",
        message: "Company does not exist",
      });
    }
  };
};

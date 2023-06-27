module.exports = function makeGetCompanyNameByCompanyId({
  getCompanyNameByCompanyId,
}) {
  return async function createGetCompanyNameByCompanyId(req, res) {
    console.info(`Inside get company name by companyId controller`);

    const {companyId} = req.params;
    try {
      console.log("get company name by companyId");
      const result = await getCompanyNameByCompanyId({
        companyId,
      });
      console.log("Exiting get company name by companyId controller");
      res.status(200).json({
        status: "Success",
        message: "Company name fetched",
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

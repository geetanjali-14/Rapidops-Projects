module.exports = function makeGetCompanyNameByCompanyId({
  getCompanyNameByCompanyId,
}) {
  return async function createGetCompanyNameByCompanyId(req, res) {
    const {companyId} = req.params;
    const companyName = await getCompanyNameByCompanyId({
      companyId,
    });
    res.status(200).json({
      status: "Success",
      message: "Company name fetched",
      companyName: companyName,
    });
  };
};

module.exports = function makeGetCompanyIdByCompanyName({
  getCompanyIdByCompanyName,
}) {
  return async function createGetCompanyIdByCompanyName(req, res) {
    console.log("Entering get companyId Controller with input as ", req.params);

    const {companyName} = req.params;
    const companyId = await getCompanyIdByCompanyName({ companyName });

    res.status(200).json({
      status: "Success",
      message: "Company ID fetched",
      companyId: companyId,
    });
  };
};

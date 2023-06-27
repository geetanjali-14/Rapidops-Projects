module.exports = function makeCompanyExists({
  companyExistsById,
}) {
  return async function createCompanyExist(req, res) {
    console.info(req.params);
    const {companyId} = req.params;
    try {
      const result = await companyExistsById({ companyId});
      res.status(200).json({
        status: "Success",
        message: "Company existence checked by ID",
        companyExistsResult: result,
      });
    } catch (error) {
      throw error;
    }
  };
};

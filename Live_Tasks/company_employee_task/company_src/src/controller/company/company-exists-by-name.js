module.exports = function makeCompanyExistsByName({
  companyExistsByName,
}) {
  return async function createCompanyExistByName(req, res) {
    console.info(req.params);
    const {companyName} = req.params;
    try {
      const result = await companyExistsByName({ companyName });
      res.status(200).json({
        status: "Success",
        message: "Company existence checked by name",
        companyExistsResult: result,
      });
    } catch (error) {
      throw error;
    }
  };
};

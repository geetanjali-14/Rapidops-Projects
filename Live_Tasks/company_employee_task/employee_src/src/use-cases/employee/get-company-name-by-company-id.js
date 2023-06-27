module.exports = function makeGetCompanyNameByCompanyId({
  Joi,
  employeeDB,
  ValidationError,
}) {
  return async function createGetCompanyNameByCompanyId({
    companyId,
  }) {
    console.info(`Inside get company name by company_id use case`);
    validateInputData({ companyId });
    try {
      console.log("get get company name by company_id use-case");
      return await employeeDB.getCompanyByEmployee({
        companyId,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInputData({ companyId }) {
    const schema = Joi.object({
      companyId: Joi.number().required().messages({
        "number.base": '"companyId" must be a number',
      }),
    });
    const { error } = schema.validate({
      companyId,
    });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

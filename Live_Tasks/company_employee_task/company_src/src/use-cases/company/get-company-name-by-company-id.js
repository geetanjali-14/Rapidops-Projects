module.exports = function makeGetCompanyNameByCompanyId({
  Joi,
  companyDB,
  ObjectNotFoundError,
  ValidationError,
  createCompanyExists,
}) {
  return async function createGetCompanyNameByCompanyId({
    companyId,
  }) {
    console.log("Entering get companyId Use-case with input as ", {
      companyId,
    });
    validateInputData({ companyId });

    const companyExistsResult = await createCompanyExists({ companyId });

    if (!companyExistsResult) {
      console.info("Company does not exist.");
      throw new ObjectNotFoundError("Company does not exist with this ID");
    }

    return await companyDB.companyNameByCompanyId({ companyId });
  };

  function validateInputData({ companyId }) {
    const schema = Joi.object().keys({
      companyId: Joi.number().integer().required(),
    });
    const { error } = schema.validate({ companyId });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

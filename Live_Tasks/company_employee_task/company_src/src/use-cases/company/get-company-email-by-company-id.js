module.exports = function makeGetCompanyEmailByCompanyId({
  Joi,
  companyDB,
  ValidationError,
}) {
  return async function createGetCompanyEmailByCompanyId({ companyId }) {
    console.log("Entering get companyEmail Use-case with input as ", {
      companyId,
    });
    validateInputData({ companyId });
    return await companyDB.companyEmailByCompanyId({
      companyId,
    });
  };

  function validateInputData({ companyId }) {
    const schema = Joi.object().keys({
      companyId: Joi.number().integer().required(),
    });
    const { error } = schema.validate({ companyId });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

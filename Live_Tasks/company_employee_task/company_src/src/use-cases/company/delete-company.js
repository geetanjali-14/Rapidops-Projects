module.exports = function makeDeleteCompany({
  companyDB,
  Joi,
  createCompanyExists,
  ValidationError,
  ObjectNotFoundError,
}) {
  return async function createDeleteCompany({ companyId }) {
    console.info(`Inside delete company use case`);
    validateInputData({ companyId });

    const companyExistsResult = await createCompanyExists({ companyId });
    if (!companyExistsResult) {
      console.info('Company does not exist.');
      throw new ObjectNotFoundError('Company does not exist with this ID');
    }

    return await companyDB.deleteCompany({ companyId });
  
  };

  function validateInputData({ companyId }) {
    const schema = Joi.object({
      companyId: Joi.number().required(),
    });
    const { error } = schema.validate({ companyId });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

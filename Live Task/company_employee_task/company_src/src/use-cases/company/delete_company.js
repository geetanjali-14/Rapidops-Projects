module.exports = function makeDeleteCompanyUseCase({
  companyDB,
  Joi,
  createCompanyExistsCompanyFunction,
  ValidationError,
  ForbiddenError,
}) {
  return async function deleteCompanyUseCase({ company_id, database_name }) {
    console.info(`Inside delete user use case`);
    validateInput({ company_id });
    try {
      const company_exists = await createCompanyExistsCompanyFunction({
        company_id,
        database_name,
      });
      if (company_exists) {
        const deletedCompanyID = await companyDB.deleteCompany({
        company_id,
        database_name,
      });
      return deletedCompanyID;
      }
      else{
        console.info('Company does not Exists.')
        throw new ForbiddenError('Company Does not Exists with name');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ company_id }) {
    const schema = Joi.object({
      company_id: Joi.number().required().messages({
        "number.base": '"company_id" must be a number',
      }),
    });
    const { error } = schema.validate({ company_id });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

module.exports = function makeGetCompanyIdByCompanyNameUseCase({
  Joi,
  companyDB,
  createCompanyExistsByNameCompanyFunction,
  ForbiddenError,
  ValidationError,
}) {
  return async function getCompanyIdByCompanyNameUseCase({
    company_name,
    database_name, 
  }) {
    console.info("Inside find company_id use case");
    validateInput({ company_name });
    try {
      const company_exists = await createCompanyExistsByNameCompanyFunction({
        company_name,
        database_name,
      });
      if (company_exists) {
        const company_id = await companyDB.findIdbyCompanyName({
          company_name,
          database_name,
        });
        return company_id;
      } else {
        console.info('Company does not Exists with this name')
        throw new ForbiddenError('Company does not Exists with this name');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ company_name }) {
    const schema = Joi.object({
      company_name: Joi.string().required(),
    });

    const { error } = schema.validate({ company_name });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

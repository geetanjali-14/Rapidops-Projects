module.exports = function makeCreateCompanyUseCase({
  Joi,
  companyDB,
  createCompanyExistsByNameCompanyFunction,
  ForbiddenError,
  ValidationError
}) {
  return async function createCompanyFunction({
    company_name,
    address,
    company_email,
    database_name,
  }) {
    console.info(`Inside create Company use case`);
    validateInput({ company_name, address ,company_email});
    try {
      console.log("Create company use-case");
      const company_exists=await createCompanyExistsByNameCompanyFunction({company_name,database_name})
      if (company_exists)
      {
        console.info('Company Already Exists with name')
        throw new ForbiddenError('Company Already Exists with name');
      }
      else
      {
        const result = await companyDB.createCompany({
          company_name,
          address,
          company_email,
          database_name,
        });
        console.log("Exiting create company Usecase");
        return result;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ company_name, address,company_email }) {
    const schema = Joi.object({
      company_name: Joi.string().required(),
      address: Joi.string().required(),
      company_email: Joi.string().email().required(),
    });

    const { error } = schema.validate({
      company_name,
      address,
      company_email,
    });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

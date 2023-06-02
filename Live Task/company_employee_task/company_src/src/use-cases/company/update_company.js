module.exports = function makeUpdateCompanyUseCase({
  Joi,
  companyDB,
  ForbiddenError,
  ValidationError,
}) {
  return async function updateCompanyUsecase({
    company_id,
    company_name,
    address,
    database_name,
  }) {
    console.info(`Inside update company use case`);
    validateInput({ company_id, company_name, address });
    try {
      const company_exists = await createCompanyExistsCompanyFunction({
        company_id,
        database_name,
      });

      if (company_exists) {
        const companyDetails = await companyDB.updateCompany({
          company_id,
          company_name,
          address,
          database_name,
        });
        return companyDetails;
      } else {
        console.info("Company does not Exists.");
        throw new ForbiddenError("Company Does not Exists with name");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ company_id, company_name, address }) {
    const schema = Joi.object({
      company_id: Joi.number().required().messages({
        "number.base": '"id" must be a number',
      }),
      company_name: Joi.string().required(),
      address: Joi.string().required(),
    });

    const { error } = schema.validate({ company_id, company_name, address });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

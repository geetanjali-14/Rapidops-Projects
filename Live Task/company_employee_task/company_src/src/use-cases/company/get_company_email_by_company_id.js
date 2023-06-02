module.exports = function makeGetCompanyEmailByCompanyIdController({
  Joi,
  companyDB,
  ForbiddenError,
  ValidationError,
  createCompanyExistsCompanyFunction,
}) {
  return async function createGetCompanyEmailByCompanyId({
    company_id,
    database_name,
  }) {
    console.log("Entering get company_email Use-case with input as ", {
      company_id,
      database_name,
    });
    validInput({ company_id });
    const company_exists = await createCompanyExistsCompanyFunction({
      company_id,
      database_name,
    });

    if (company_exists) {
      const company_email = await companyDB.companyEmailByCompanyId({
        company_id,
        database_name,
      });
      console.info("Exiting get company_email Use-case", company_email);

      return company_email;
    } else {
      console.info("Company does not Exists.");
      throw new ForbiddenError("Company Does not Exists with this id");
    }
  };

  function validInput({ company_id }) {
    const schema = Joi.object().keys({
      company_id: Joi.number().integer().required(),
    });
    const { error } = schema.validate({ company_id });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

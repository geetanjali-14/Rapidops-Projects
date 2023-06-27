module.exports = function makeUpdateCompany({
  Joi,
  companyDB,
  DuplicateObjectDeclarationError,
  ValidationError,
  ObjectNotFoundError,
  createCompanyExists,
  createCompanyExistByName,
}) {
  return async function createUpdateCompany({
    companyId,
    companyName,
    address,
    companyEmail,
  }) {
    console.info(`Inside update company use case`);
    validateInputData({ companyId, companyName, address, companyEmail });

    const companyExistsResult = await createCompanyExists({ companyId });

    if (!companyExistsResult) {
      console.info("Company does not exist.");
      throw new ObjectNotFoundError("Company does not exist with this ID");
    }

    const companyNameExistsResult = await createCompanyExistByName({ companyName });

    if (companyNameExistsResult) {
      console.info("Company Name already exists.");
      throw new DuplicateObjectDeclarationError("Company name already exists");
    }

    return await companyDB.updateCompany({
      companyId,
      companyName,
      address,
      companyEmail,
    });

  };

  function validateInputData({
    companyId,
    companyName,
    address,
    companyEmail,
  }) {
    const schema = Joi.object({
      companyId: Joi.number(),
      companyName: Joi.string(),
      address: Joi.string(),
      companyEmail: Joi.string().email(),
    });

    const { error } = schema.validate({
      companyId,
      companyName,
      address,
      companyEmail,
    });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

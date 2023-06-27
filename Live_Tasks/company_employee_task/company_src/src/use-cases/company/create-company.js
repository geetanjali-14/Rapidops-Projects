module.exports = function makeCreateCompany({
  Joi,
  companyDB,
  createCompanyExistByName,
  ValidationError,
  DuplicateObjectDeclarationError
}) {
  return async function createCreateCompany({
    companyName,
    address,
    companyEmail,
  }) {
    validateInputData({ companyName, address ,companyEmail});
    try {
      console.log("Create company use-case");
      const companyExistsResult=await createCompanyExistByName({companyName})
      if (companyExistsResult)
      {
        throw new DuplicateObjectDeclarationError('Company Already Exists with name');
      }
      else
      {
        return await companyDB.createCompany({
          companyName,
          address,
          companyEmail,
        });
      }
    } catch (error) {
      throw error;
    }
  };
  function validateInputData({ companyName,companyEmail,address }) {
    const schema = Joi.object({
      companyName: Joi.string().required(),
      companyEmail: Joi.string().email().required(),
      address: Joi.string().required(),
    });

    const { error } = schema.validate({
      companyName,
      companyEmail,
      address,
    });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

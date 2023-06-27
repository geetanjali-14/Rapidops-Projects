module.exports = function makeGetCompanyIdByCompanyName({
  Joi,
  companyDB,
  createCompanyExistByName,
  ObjectNotFoundError,
  ValidationError,
}) {
  return async function createGetCompanyIdByCompanyName({ companyName }) {
    console.info("Inside find companyId use case");
    validateInputData({ companyName });
    const companyExistsResult = await createCompanyExistByName({ companyName });

    if (!companyExistsResult) {
      throw new ObjectNotFoundError("Company does not exist with this name");
    }

    return await companyDB.findIdByCompanyName({ companyName });
  };

  function validateInputData({ companyName }) {
    const schema = Joi.object({
      companyName: Joi.string().required(),
    });

    const { error } = schema.validate({ companyName });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

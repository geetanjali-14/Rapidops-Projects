module.exports = function makeGetEmployeeByCompany({
  Joi,
  employeeDB,
  ValidationError,
  companyExists,
  ForbiddenError
}) {
  return async function createGetEmployeeByCompany({
    companyName,
  }) {
    console.info(`Inside get ${companyName} employee list use case`);
    validateInputData({ companyName });

    try {
      console.log("Get company's employee use-case");

      const companyExistsResult = await companyExists({ companyName });
      console.log("company_exists", companyExistsResult);

      if (!companyExistsResult) {
        console.info("Company does not exist");
        throw new ForbiddenError("Company with this name does not exist");
      }

      return await employeeDB.getEmployeesByCompanyName({
        companyName,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function validateInputData({ companyName }) {
    const schema = Joi.object({
      companyName: Joi.string().required().messages({
        "string.base": '"companyName" must be a string',
      }),
    });

    const { error } = schema.validate({ companyName });

    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

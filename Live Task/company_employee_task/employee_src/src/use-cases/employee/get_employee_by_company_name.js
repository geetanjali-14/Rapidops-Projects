module.exports = function makeGetEmployeeByCompanyUseCase({
  Joi,
  employeeDB,
  ValidationError,
  companyExists,
  ForbiddenError
}) {
  return async function createGetEmployeeByCompanyUseCase({
    company_name,
    database_name,
  }) {
    console.info(`Inside get ${company_name} employee list use case`);
    validateInput({ company_name });
    try {
      console.log("get company's employee use-case");

      const companyExistsResult = await companyExists({ company_name });
      console.log("company_exists", companyExistsResult);

      if (companyExistsResult) {
        const result = await employeeDB.getEmployeesByCompanyName({
          company_name,
          database_name,
        });
        console.log(
          "Exiting get company's employee list in employees Usecase",
          result
        );
        return result;
      } else {
        console.info("Company Entered Does not exist");
        throw new ForbiddenError("Company with this name does not exist");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ company_name }) {
    const schema = Joi.object({
      company_name: Joi.string().required().messages({
        "string.base": '"company_name" must be a string',
      }),
    });
    const { error } = schema.validate({
      company_name,
    });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

module.exports = function makeGetCompanyByEmployeeUseCase({
  Joi,
  employeeDB,
  ValidationError,
}) {
  return async function createGetCompanyByEmployeeFunction({
    company_id,
    database_name,
  }) {
    console.info(`Inside get employee's company use case`);
    validateInput({ company_id });
    try {
      console.log("get employee's company use-case");
      const result = await employeeDB.getCompanyByEmployee({
        company_id,
        database_name,
      });
      console.log("Exiting get company name by company_id Use case");
      return result;
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
    const { error } = schema.validate({
      company_id,
    });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

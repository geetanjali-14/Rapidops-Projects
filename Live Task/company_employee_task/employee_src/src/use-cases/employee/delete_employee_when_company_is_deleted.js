module.exports = function makeDeleteEmployeeOfDeletedCompanyUseCase({
  Joi,
  employeeDB,
  ValidationError,
  ForbiddenError,
  companyExistsById,
}) {
  return async function createDeleteEmployeeOfDeletedCompanyFunction({
    company_id,
    database_name,
  }) {
    console.info(`Inside delete employee when company is deleted use case`);
    validateInput({ company_id });
    try {
      console.log("delete employee when company is deleted use-case");

      const companyExistsResult = await companyExistsById({ company_id });
      console.log("company_exists", companyExistsResult);

      if (companyExistsResult) {
        console.info("Company ID Entered exists");
        throw new ForbiddenError("Company with this ID still exist");
      } 
      else {
        const result = await employeeDB.deleteEmployeeOfDeletedCompany({
          company_id,
          database_name,
        });
        console.log("Exiting delete employee when company is deleted Usecase");
        return result;
      }
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

    const { error } = schema.validate({ company_id });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

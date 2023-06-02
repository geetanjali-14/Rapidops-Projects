module.exports = function makeUpdateEmployeeWhenCompanyDetailsChangesUseCase({
  Joi,
  employeeDB,
  ValidationError,
  ForbiddenError,
  companyExistsById
}) {
  return async function createUpdateEmployeeWhenCompanyDetailsChangesFunction({
    company_id,
    company_name,
    database_name,
  }) {
    console.info(
      `Inside update Update Employee When Company Details Changes use case`
    );
    validateInput({
      company_id,
      company_name,
    });
    try {
      console.log("update employee use-case");
      const companyExistsResult = await companyExistsById({ company_id });
      console.log("company_exists", companyExistsResult);

      if (companyExistsResult) {
        const result = await employeeDB.updateEmployeeWhenCompanyIsUpdated({
          company_id,
          company_name,
          database_name,
        });
        console.log("Exiting update employee Usecase");
        return result;
      } else {
        console.info("Company ID Entered Does not exist");
        throw new ForbiddenError("Company with this ID does not exist");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ company_id, company_name }) {
    const schema = Joi.object({
      company_id: Joi.number().required().messages({
        "number.base": '"company_id" must be a number',
      }),
      company_name: Joi.string().required().messages({
        "string.base": '"company_name" must be a string',
      }),
    });
    const { error } = schema.validate({
      company_id,
      company_name,
    });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

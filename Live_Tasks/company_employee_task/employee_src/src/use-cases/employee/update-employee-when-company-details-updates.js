module.exports = function makeUpdateEmployeeWhenCompanyDetailsChanges({
  Joi,
  employeeDB,
  ValidationError,
  ForbiddenError,
  companyExistsById
}) {
  return async function createUpdateEmployeeWhenCompanyDetailsChanges({
    companyId,
    companyName,
  }) {
    console.info(`Inside update Update Employee When Company Details Changes use case`);
    validateInputData({ companyId, companyName });

    try {
      console.log("Update employee use-case");
      const companyExistsResult = await companyExistsById({ companyId });
      console.log("company_exists", companyExistsResult);

      if (!companyExistsResult) {
        console.info("Company ID Entered Does not exist");
        throw new ForbiddenError("Company with this ID does not exist");
      }

      return await employeeDB.updateEmployeeWhenCompanyIsUpdated({
        companyId,
        companyName,
      });

    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function validateInputData({ companyId, companyName }) {
    const schema = Joi.object({
      companyId: Joi.number().required().messages({
        "number.base": '"companyId" must be a number',
      }),
      companyName: Joi.string().required().messages({
        "string.base": '"companyName" must be a string',
      }),
    });

    const { error } = schema.validate({ companyId, companyName });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

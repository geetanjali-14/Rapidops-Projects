module.exports = function makeDeleteEmployeeOfDeletedCompanyUseCase({
  Joi,
  employeeDB,
}) {
  return async function createDeleteEmployeeOfDeletedCompanyFunction({
    company_id,
    database_name,
  }) {
    console.info(`Inside delete employee when company is deleted use case`);
    validateInput({ company_id });
    try {
      console.log("delete employee when company is deleted use-case");
      const result = await employeeDB.deleteEmployeeOfDeletedCompany({
        company_id,
        database_name,
      });
      console.log("Exiting delete employee when company is deleted Usecase");
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function validateInput({ company_id }) {
    const schema = Joi.object({
      company_id: Joi.number().integer().required(),
    });

    const { error } = schema.validate({ company_id });
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

module.exports = function makeDeleteEmployeeOfDeletedCompany({
  Joi,
  employeeDB,
  ValidationError,
}) {
  return async function createDeleteEmployeeOfDeletedCompany({ companyId }) {
    console.info(`Inside delete employee when company is deleted use case`);
    validateInputData({ companyId });
    try {
      console.log("delete employee when company is deleted use-case");
      return await employeeDB.deleteEmployeeOfDeletedCompany({
        companyId,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function validateInputData({ companyId }) {
    const schema = Joi.object({
      companyId: Joi.number().integer().required(),
    });
    const { error } = schema.validate({ companyId });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

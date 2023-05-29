module.exports = function makeGetEmployeeByCompanyUseCase({ Joi, employeeDB }) {
  return async function createGetEmployeeByCompanyUseCase({
    company_name,
    database_name,
  }) {
    console.info(`Inside get company's employee list use case`);
    validateInput({ company_name });
    try {
      console.log("get company's employee use-case");
      const result = await employeeDB.getEmployeesByCompanyName({
        company_name,
        database_name,
      });
      console.log("Exiting get company's employee list in employees Usecase",result);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ company_name }) {
    const schema = Joi.object({
      company_name: Joi.string().required(),
    });
    const { error } = schema.validate({
      company_name,
    });
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

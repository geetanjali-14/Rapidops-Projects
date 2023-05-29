module.exports = function makeGetCompanyByEmployeeUseCase({ Joi, employeeDB }) {
    return async function createGetCompanyByEmployeeFunction({
      company_id,
      database_name,
    }) {
      console.info(`Inside get employee's company use case`);
      validateInput({ company_id });
      try {
        console.log("get employee's company use-case");
        const result = await getCompanyByEmployee({
          company_id,
          database_name,
        });
        console.log("Exiting get employee's company Usecase");
        return result;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
    function validateInput({ company_id}) {
      const schema = Joi.object({
        company_id: Joi.integer().required()
      })
      const { error } = schema.validate({
        company_id
      });
      if (error) {
        console.error(error);
        throw new Error(`${error.details[0].message}`);
      }
    }
  };
  
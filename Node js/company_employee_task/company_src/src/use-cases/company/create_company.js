module.exports = function makeCreateCompanyUseCase({ Joi,companyDB }) {
    return async function createCompanyFunction({
      company_name,
      address,
      database_name,
    }) {
      console.info(`Inside create Company use case`);
      validateInput({company_name,
        address });
      try {
        console.log("Create company use-case");
        const result = await companyDB.createCompany({
          company_name,
          address,
          database_name,
        });
        console.log("Exiting create company Usecase");
        return result;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
    function validateInput({
      company_name,
      address,
    }) {
      const schema = Joi.object({
        company_name: Joi.string().required(),
        address: Joi.string().required(),
      });
  
      const { error } = schema.validate({
        company_name,
        address,
      });
      if (error) {
        console.error(error);
        throw new Error(`${error.details[0].message}`);
      }
    }
};
module.exports = function makeDeleteCompanyUseCase({
    companyDB,
    Joi
  }) {
    return async function deleteCompanyUseCase({ company_id ,database_name}) {
      console.info(`Inside delete user use case`);
      validateInput({company_id});
      try{
        const deletedCompanyID= await companyDB.deleteCompany({ company_id ,database_name});
        // console.log(deletedCompanyID)
        return deletedCompanyID;
      }
      catch (err) {
        console.error(err);
        throw err;
      }
    };
    function validateInput({company_id}) {
      const schema = Joi.object({
        company_id: Joi.number().required().messages({
          'number.base':'"company_id" must be a number',
        }),
      });
      const {error} = schema.validate({company_id});
      if (error) {
        console.error(error)
        throw new Error(`${error.details[0].message}`);
      }
    }
  };
  
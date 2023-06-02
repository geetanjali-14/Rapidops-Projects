module.exports = function makeCompanyExistUseCase({
    Joi,
    companyDB,
    ValidationError,
  }){
      return async function companyExistUsecase({company_id,database_name}){
          console.info(company_id)
          validateInput({company_id});
          try{
              const result = await companyDB.companyExists({company_id,database_name});
              return result;
          }
          catch(e){
              console.error(e);
              throw e;
          }
      }
      function validateInput({company_id}) {
          const schema = Joi.object({
            company_id: Joi.number().required().messages({
              'number.base':'"id" must be a number',
            }),
          });
      
          const {error} = schema.validate({company_id});
          if (error) {
            console.error(error)
            throw new ValidationError(`${error.details[0].message}`);
          }
        }
  }
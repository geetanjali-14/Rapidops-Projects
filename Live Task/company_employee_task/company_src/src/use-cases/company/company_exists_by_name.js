module.exports = function makeCompanyExistByNameUseCase({
    Joi,
    companyDB,
    ValidationError,
  }){
      return async function companyExistByNameUsecase({company_name,database_name}){
          console.info(company_name)
          validateInput({company_name});
          try{
              const result = await companyDB.companyExistsByName({company_name,database_name});
              console.log("result in companyExistsByName use-case",result);
              return result;
          }
          catch(e){
              console.error(e);
              throw e;
          }
      }
      function validateInput({company_name}) {
          const schema = Joi.object({
            company_name: Joi.string().required().messages({
              "string.base": '"company_name" must be a string',
            }),
          });
      
          const {error} = schema.validate({company_name});
          if (error) {
            console.error(error)
            throw new ValidationError(`${error.details[0].message}`);
          }
        }
  }
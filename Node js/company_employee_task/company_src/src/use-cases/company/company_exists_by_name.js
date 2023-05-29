module.exports = function makeCompanyExistByNmeUseCase({
    Joi,
    companyDB,
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
            company_name: Joi.string().required()
          });
      
          const {error} = schema.validate({company_name});
          if (error) {
            console.error(error)
            throw new Error(`${error.details[0].message}`);
          }
        }
  }
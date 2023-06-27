module.exports = function makeCompanyExist({
    Joi,
    companyDB,
    ValidationError,
  }){
      return async function createCompanyExist({companyId}){
          console.info(companyId)
          validateInputData({companyId});
          try{
              return await companyDB.companyExists({companyId});
          }
          catch(e){
              console.error(e);
              throw e;
          }
      }
      function validateInputData({companyId}) {
          const schema = Joi.object({
            companyId: Joi.number().required(),
          });
      
          const {error} = schema.validate({companyId});
          if (error) {
            throw new ValidationError(`${error.details[0].message}`);
          }
        }
  }
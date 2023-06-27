module.exports = function makeCompanyExistByName({
    Joi,
    companyDB,
    ValidationError,
  }){
      return async function createCompanyExistByName({companyName}){
          console.info(companyName)
          validateInputData({companyName});
          try{
              return await companyDB.companyExistsByName({companyName});
          }
          catch(e){
              console.error(e);
              throw e;
          }
      }
      function validateInputData({companyName}) {
          const schema = Joi.object({
            companyName: Joi.string().required(),
          });
      
          const {error} = schema.validate({companyName});
          if (error) {
            throw new ValidationError(`${error.details[0].message}`);
          }
        }
  }
module.exports = function makeGetCompanyIdByCompanyNameUseCase({
    Joi,
    companyDB,
  }){
    return async function getCompanyIdByCompanyNameUseCase({company_name,database_name}){
        console.info("Inside find company_id use case");
        validateInput({company_name});
        try{
            const company_id = await companyDB.findIdbyCompanyName({company_name,database_name});
            // console.log(company_id);
            return company_id;
        }
        catch (err) {
            console.error(err);
            throw err;
          }
    }
    function validateInput({company_name}) {
        const schema = Joi.object({
            company_name: Joi.string().required(),
        });
    
        const {error} = schema.validate({company_name});
        if (error) {
          console.error(error)
          throw new Error(`${error.details[0].message}`);
        }
      }
  }
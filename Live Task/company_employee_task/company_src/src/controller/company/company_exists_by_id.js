module.exports = function makeCompanyExistsController({
    Joi,
    companyExistsById,
  }){
      return async function companyExistController(req,res){
          console.info(req.params)
          const company_id = req.params.company_id;
          const database_name = "company";
          validateInput({company_id});
          try{
              const result = await companyExistsById({company_id,database_name});
              res.status(200).json({
                status: "Success",
                message: "Company' existence checked by id",
                company_exists: result,
              });
              return result;
          }
          catch(e){
              console.error(e);
              throw e;
          }
      }
      function validateInput({company_id}) {
          const schema = Joi.object({
            company_id:  Joi.number().integer().required(),
          });
      
          const {error} = schema.validate({company_id});
          if (error) {
            console.error(error)
            throw new Error(`${error.details[0].message}`);
          }
        }
  }
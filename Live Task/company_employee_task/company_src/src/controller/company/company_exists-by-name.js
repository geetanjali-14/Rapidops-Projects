module.exports = function makeCompanyExistsByNameController({
    Joi,
    companyExistsByName,
  }){
      return async function companyExistbyNameController(req,res){
          console.info(req.params)
          const company_name = req.params.company_name;
          const database_name = "company";
          validateInput({company_name});
          try{
              const result = await companyExistsByName({company_name,database_name});
              res.status(200).json({
                status: "Success",
                message: "Company' existence checked by name",
                company_exists: result,
              });
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
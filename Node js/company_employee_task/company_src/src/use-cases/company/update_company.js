module.exports = function makeUpdateCompanyUseCase({
    Joi,
    companyDB,
    }) {
   return async function updateCompanyUsecase({ company_id, company_name,address ,database_name}) {
     console.info(`Inside update company use case`);
     validateInput({ company_id, company_name ,address});
     try {
       const companyDetails = await companyDB.updateCompany({ company_id, company_name,address ,database_name});
       console.log(companyDetails);
       return companyDetails;
     } 
     catch (err) {
       console.error(err);
       throw err;
     }
   };
   function validateInput({ company_id, company_name ,address}) {
     const schema = Joi.object({
        company_id: Joi.number().required().messages({
       'number.base':'"id" must be a number',
     }),
     company_name: Joi.string().required(),
     address:Joi.string().required(),
     });
  
     const { error } = schema.validate({ company_id, company_name ,address});
     if (error) {
       console.error(error);
       throw new Error(`${error.details[0].message}`);
     }
   }
  };
  
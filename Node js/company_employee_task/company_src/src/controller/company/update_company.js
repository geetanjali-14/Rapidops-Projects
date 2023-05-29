module.exports = function makeUpdateCompanyController({
    Joi,
    updateCompany,
    companyExists,
    companyExistsByName,
    updateCompanyDetailsInEmployeeTable
  }) {
    return async function updateCompanyController(req, res) {
      console.info(`In update company controller`, req.params, req.body);
      try {
        validParamsInput(req.params);
        validBodyInput(req.body);
        
        const database_name = req.headers["database_name"];
  
        const company_id = req.params.company_id;
        const company_name = req.body.company_name;
        const address = req.body.address;
        const ans = await companyExists({ company_id ,database_name});
        console.log(ans);

        const company_name_exists=await companyExistsByName({company_name,database_name})
        if(company_name_exists)
        {
          console.info("Company Name Entered Exists Already.")
        }
        else{
          if (ans) {
            await updateCompany({ company_id, company_name,address ,database_name});
  
            await updateCompanyDetailsInEmployeeTable({company_id,company_name,address});
  
            res.status(201).json({
              status: "Success",
              messege: "company updated",
            });
          } else {
            console.log("company dosen't Exists");
            res.end('company does not Exists');
          }
        }
      } catch (err) {
        res.status(500).json({
          status: "Error",
          messege: err.message,
        });
      }
    };
  
    function validBodyInput(body) {
      const schema = Joi.object().keys({
        company_name: Joi.string().required(),
        address: Joi.string().required(),
      });
      const { error } = schema.validate(body);
      if (error) {
        console.log(error);
        throw error;
      }
    }
    function validParamsInput(params) {
      const schema = Joi.object().keys({
        company_id: Joi.number().integer().required(),
      });
      const { error } = schema.validate(params);
      if (error) {
        console.log(error);
        throw error.details[0].message;
      }
    }
  };
  
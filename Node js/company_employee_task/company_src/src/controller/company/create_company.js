module.exports=function makeCreateCompanyController({Joi,
  createCompany,
  companyExistsByName
})
{
    return async function createCompanyController(req,res)
    {
      console.log("Entering create company Controller with input as ",req.body);
      try {
        validInput(req.body);
        const company_name = req.body.company_name;
        const address = req.body.address;
        const database_name = req.headers["database_name"];

        const company_exists=await companyExistsByName({company_name,database_name});
        // console.log(company_exists);

        if (company_exists)
        {
          console.info('Company Already Exists with name')
          res.status(500).json({
            status: "Error",
          });
        }
        else{
        const companyID=await createCompany
        ({
          company_name,
          address,
          database_name,
        });

        console.info("Create Company Controller",companyID)

      res.status(201).json({
        status: "Success",
        messege: "Company Created",
      });
    }
    } catch (error) {
      res.status(500).json({
        status: "Error",
        messege: error.message,
      });
    }
    }
    function validInput(body) {
        const schema = Joi.object().keys({
          company_name: Joi.string().required(),
          address:Joi.string().required(),
        });
        const { error } = schema.validate(body);
        if (error) {
          console.error(error);
          throw new Error(`${error.details[0].message}`);
        }
      }
    };
    
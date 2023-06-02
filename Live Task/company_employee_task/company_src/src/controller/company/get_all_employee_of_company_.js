module.exports = function makeGetAllEmployeesOfCompanyController({ Joi, getAllEmployeeofCompany ,companyExistsByName}) {
    return async function createGetAllEmployeesOfCompany(req, res) {
      console.log("Entering get company's employees Controller with input as ", req.params);
      try {
        // console.log(req.params);
        validInput(req.params);
        const company_name = req.params.company_name;
        
        const database_name = req.headers["database_name"];

        const company_exists=await companyExistsByName({company_name,database_name});
        // console.log(company_exists);

        if (company_exists)
        {
        const company_id = await getAllEmployeeofCompany({
          company_name
        });
  
        console.info("Exiting get Company's employee Controller", company_id);
        res.status(200).json({
          status: "Success",
          message: "Company's Employees fetched",
          employee_names: employee_names,
        });
      }
      else{
        console.info('Company Name Does not exists')
          res.status(500).json({
            status: "Error",
          });
      }
      } catch (error) { 
        res.status(500).json({
          status: "Error",
          message: error.message,
        });
      }
    };
  
    function validInput(params) {
      const schema = Joi.object().keys({
        company_name: Joi.string().required(),
      });
      const { error } = schema.validate(params);
      if (error) {
        console.error(error);
        throw new Error(`${error.details[0].message}`);
      }
    }
  };
  
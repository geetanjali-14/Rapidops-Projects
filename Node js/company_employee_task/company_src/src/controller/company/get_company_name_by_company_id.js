module.exports = function makeGetCompanyNameByCompanyIdController({ Joi, getCompanyNameByCompanyId,companyExists }) {
  return async function createGetCompanyNameByCompanyIdController(req, res) {
    console.log("Entering get company_name Controller with input as ", req.params);
    try {
      console.log(req.params);
      const database_name = "company";
      console.log(database_name);

      const { company_id } = req.params;
      validInput(company_id);

      const company_id_exists=await companyExists({company_id,database_name});
      console.log(company_id_exists);

      if(company_id_exists)
      {
      const company_name = await getCompanyNameByCompanyId({
        company_id,
        database_name,
      });

      console.info("Exiting get Company_name Controller", company_name);
      res.status(200).json({
        status: "Success",
        message: "Company name fetched",
        company_name: company_name,
      });
      return company_name; 
    }
    else
            {
                console.log("Company ID dosen't Exists");
                res.status(201).json({
                    status:'Success',
                    messege:'Company not exists'
                })
            }
  } 
    catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };

  function validInput(company_id) {
    const schema = Joi.number().integer().required();
    const { error } = schema.validate(company_id);
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

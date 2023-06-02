module.exports = function makeGetCompanyIdByCompanyNameController({ Joi, getCompanyIdByCompanyName ,companyExistsByName}) {
  return async function createGetCompanyIdByCompanyNameController(req, res) {
    console.log("Entering get company_id Controller with input as ", req.params);
      console.log(req.params);
      validInput(req.params);
      const company_name = req.params.company_name;
      const database_name = "company";
      // console.log(database_name);

      const company_exists=await companyExistsByName({company_name,database_name});
        // console.log(company_exists);

        if (company_exists)
        {
      const company_id = await getCompanyIdByCompanyName({
        company_name,
        database_name,
      });

      console.info("Exiting get Company_id Controller", company_id);
      res.status(200).json({
        status: "Success",
        message: "Company ID fetched",
        company_id: company_id,
      });
    }
    else{
      console.info('Company Name Does not exists')
        res.status(500).json({
          status: "Error",
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

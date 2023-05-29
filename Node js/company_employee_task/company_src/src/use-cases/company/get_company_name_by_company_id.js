module.exports = function makeGetCompanyNameByCompanyIdController({ Joi, companyDB }) {
    return async function createGetCompanyNameByCompanyIdController({
        company_id,
        database_name,
      }) {
      console.log("Entering get company_id Use-case with input as ", {
        company_id,
        database_name,
      });
      try {
        validInput({company_id});

        const company_name = await companyDB.companyNameByCompanyId({
          company_id,
          database_name,
        });
  
        console.info("Exiting get Company_name Controller", company_name);
        res.status(200).json({
          status: "Success",
          message: "Company ID fetched",
          company_name: company_name,
        });
      } catch (error) {
        res.status(500).json({
          status: "Error",
          message: error.message,
        });
      }
    };
  
    function validInput({company_id}) {
      const schema = Joi.object().keys({
        company_id: Joi.number().integer().required(),
      });
      const { error } = schema.validate({company_id});
      if (error) {
        console.error(error);
        throw new Error(`${error.details[0].message}`);
      }
    }
  };
  
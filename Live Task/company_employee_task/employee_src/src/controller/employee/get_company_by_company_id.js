module.exports = function makeGetCompanyByEmployeeUseCase({
  Joi,
  getCompanyByCompanyId,
}) {
  return async function createGetCompanyByEmployeeFunction(req, res) {
    console.info(`Inside get company name by company_id use-case`);

    const company_id = req.params.company_id;
    const database_name = "company";
    console.log(company_id);
    validateInput({ company_id });

    try {
      console.log("get company name by company_id");
      const result = await getCompanyByCompanyId({
        company_id,
        database_name,
      });
      console.log("Exiting get employee's company Usecase");
      res.status(201).json({
        status: "Success",
        messege: "Company Name fetched",
        "Comapny":result,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ company_id }) {
    const schema = Joi.object({
      company_id: Joi.number().integer().required(),
    });
    const { error } = schema.validate({
      company_id,
    });
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

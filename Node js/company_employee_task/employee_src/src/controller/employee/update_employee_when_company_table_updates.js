module.exports = function makeUpdateEmployeeWhenCompanyTableUpdatesController({
  Joi,
  updateEmployeeWhenCompanyTableUpdates,
}) {
  return async function createUpdateEmployeeWhenCompanyTableUpdatesController(req,res) {
    console.info(`Inside update EmployeeWhenCompanyDetailsChanges Controller`);
    const company_id = req.params.company_id;
    const company_name = req.body.company_name;
    const database_name = 'employee';

    validateInput({
      company_id,
      company_name,
    });
    try {
      console.log("update updateEmployeeWhenCompanyTableUpdates Controller");
      const result = await updateEmployeeWhenCompanyTableUpdates({
        company_id,
        company_name,
        database_name,
      });
      console.log("Exiting update employee Controller");
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ company_id, company_name}) {
    const schema = Joi.object({
      company_id: Joi.number().integer().required(),
      company_name: Joi.string().required(),
    });
    const { error } = schema.validate({
      company_id,
      company_name,
    });
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

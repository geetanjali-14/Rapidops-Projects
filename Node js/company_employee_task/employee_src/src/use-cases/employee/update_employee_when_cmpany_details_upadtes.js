module.exports = function makeUpdateEmployeeWhenCompanyDetailsChangesUseCase({ Joi, employeeDB }) {
    return async function createUpdateEmployeeWhenCompanyDetailsChangesFunction({
        company_id,
        company_name,
        database_name,
      }) {
      console.info(`Inside update Update Employee When Company Details Changes use case`);
      validateInput({
        company_id,
        company_name,
      });
      try {
        console.log("update employee use-case");
        const result = await employeeDB.updateEmployeeWhenCompanyIsUpdated({
            company_id,
            company_name,
            database_name,
          });
        console.log("Exiting update employee Usecase");
        return result;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
    function validateInput({
        company_id,
        company_name,
      }) {
      const schema = Joi.object({
        company_id: Joi.number().integer().required(),
        company_name: Joi.string().required(),
      });
      const { error } = schema.validate({
        company_id,
        company_name
      });
      if (error) {
        console.error(error);
        throw new Error(`${error.details[0].message}`);
      }
    }
  };
  
module.exports = function makeUpdateEmployeeUseCase({ Joi, employeeDB }) {
  return async function createUpdateEmployeeFunction({
    employee_id,
    employee_name,
    role,
    company_id,
    company_name,
    database_name,
  }) {
    console.info(`Inside update employee use case`);
    validateInput({employee_id, employee_name, role, company_id, company_name });
    try {
      console.log("update employee use-case");
      const result = await employeeDB.updateEmployee({
        employee_id,
        employee_name,
        role,
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
    employee_id,
    employee_name,
    role,
    company_id,
    company_name,
  }) {
    const schema = Joi.object({
      employee_id: Joi.number().integer().required(),
      employee_name: Joi.string().required(),
      role: Joi.string().required(),
      company_id: Joi.number().integer().required(),
      company_name: Joi.string().required(),
    });
    const { error } = schema.validate({
      employee_id,
      employee_name,
      role,
      company_id,
      company_name,
    });
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

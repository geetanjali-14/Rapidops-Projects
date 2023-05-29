module.exports = function makeCreateEmployeeUseCase({ Joi, employeeDB }) {
  return async function createEmployeeFunction({
    employee_name,
    role,
    company_id,
    company_name,
    database_name,
  }) {
    console.info(`Inside create employee use case`);
    validateInput({ employee_name, role, company_id, company_name });
    try {
      console.log("Create employee use-case");
      const result = await employeeDB.createEmployee({
        employee_name,
        role,
        company_id,
        company_name,
        database_name,
      });
      console.log("Exiting create employee Usecase");
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ employee_name, role,company_id, company_name }) {
    const schema = Joi.object({
      employee_name: Joi.string().required(),
      role: Joi.string().required(),
      company_id:Joi.number().integer().required(),
      company_name: Joi.string().required(),
    });

    const { error } = schema.validate({
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

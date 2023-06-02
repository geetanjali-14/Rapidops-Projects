module.exports = function makeUpdateEmployeeUseCase({
  Joi,
  employeeDB,
  ValidationError,
  ForbiddenError,
  createEmployeeExistsFunction,
}) {
  return async function createUpdateEmployeeFunction({
    employee_id,
    employee_name,
    role,
    company_id,
    company_name,
    database_name,
  }) {
    console.info(`Inside update employee use case`);
    validateInput({
      employee_id,
      employee_name,
      role,
      company_id,
      company_name,
      database_name,
    });
    try {
      console.log("update employee use-case");
      const employee_exists = await createEmployeeExistsFunction({
        employee_id,
        database_name,
      });
      console.log("employee_exists", employee_exists);

      if (employee_exists) {
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
      } else {
        console.info("Employee Entered Dose not exists");
        throw new ForbiddenError("Employee Entered Dose not exists");
      }
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
    database_name,
  }) {
    const schema = Joi.object({
      employee_id: Joi.number().required().messages({
        "number.base": '"employee_id" must be a number',
      }),
      employee_name: Joi.string().required().messages({
        "string.base": '"employee_name" must be a string',
      }),
      role: Joi.string().required().messages({
        "string.base": '"role" must be a string',
      }),
      company_id: Joi.number().required().messages({
        "number.base": '"company_id" must be a number',
      }),
      company_name: Joi.string().required().messages({
        "string.base": '"company_name" must be a string',
      }),
      database_name: Joi.string().required().messages({
        "string.base": '"database_name" must be a string',
      }),
    });

    const { error } = schema.validate({
      employee_id,
      employee_name,
      role,
      company_id,
      company_name,
      database_name,
    });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

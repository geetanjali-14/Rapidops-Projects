module.exports = function makeDeleteEmployeeUseCase({
  Joi,
  employeeDB,
  createEmployeeExistsFunction,
  ValidationError,
  ForbiddenError
}) {
  return async function createDeleteEmployeeFunction({
    employee_id,
    database_name,
  }) {
    console.info(`Inside delete employee use case`);
    validateInput({ employee_id });
    try {
      console.log("delete employee use-case");
      const employee_exists = await createEmployeeExistsFunction({
        employee_id,
        database_name,
      });
      console.log("employee_exists", employee_exists);

      if (employee_exists) {
        const result = await employeeDB.deleteEmployee({
          employee_id,
          database_name,
        });
        console.log("Exiting delete employee Usecase");
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

  function validateInput({ employee_id }) {
    const schema = Joi.object({
      employee_id: Joi.number().required().messages({
        "number.base": '"employee_id" must be a number',
      }),
    });

    const { error } = schema.validate({ employee_id });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

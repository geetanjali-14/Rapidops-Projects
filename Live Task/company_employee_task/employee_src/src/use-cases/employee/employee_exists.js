module.exports = function makeEmployeeExistsUseCase({
  Joi,
  employeeDB,
  ValidationError,
  ForbiddenError,
}) {
  return async function employeeExistsUsecase({ employee_id, database_name }) {
    console.info(employee_id);
    validateInput({ employee_id });
    try {
      const employee_exists = await employeeDB.employeeExists({
        employee_id,
        database_name,
      });
      console.log("employee_exists", employee_exists);
      if (employee_exists) {
        return employee_exists;
      } else {
        console.info("Employee does not exist");
        throw new ForbiddenError({
          message: "Employee with this ID does not exist",
          employee_exists: false,
        });
      }
    } catch (e) {
      console.error(e);
      throw e;
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
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
}

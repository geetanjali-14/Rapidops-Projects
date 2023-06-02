module.exports = function makeEmployeeEmailExistsUseCase({ Joi,employeeDB }) {
  return async function employeeEmailExistsUsecase({
    employee_email,
    database_name,
  }) {
    console.info(employee_email);
    validateInput({ employee_email });
    try {
      const employee_exists = await employeeDB.employeeEmailExists({
        employee_email,
        database_name,
      });
      console.log("employee_exists", employee_exists);
      return employee_exists;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  function validateInput({ employee_email }) {
    const schema = Joi.object({
      employee_email: Joi.string().email().required(),
    });

    const { error } = schema.validate({ employee_email });
    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

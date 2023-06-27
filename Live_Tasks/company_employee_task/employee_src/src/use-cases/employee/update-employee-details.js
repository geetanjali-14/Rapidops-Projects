module.exports = function makeUpdateEmployee({
  Joi,
  employeeDB,
  ValidationError,
  createEmployeeExists,
  isVerifiedEmployee,
  fetchCompanyIdByCompanyName,
  companyExists,
  ObjectNotFoundError,
  InvalidAccessError,
}) {
  return async function createUpdateEmployee({
    employeeId,
    employeeName,
    jobTitle,
    companyName,
  }) {
    console.info(`Inside update employee use case`);
    const companyId = await fetchCompanyIdByCompanyName({
      companyName,
    });
    console.log(companyId);
    validateInputData({
      employeeId,
      employeeName,
      jobTitle,
      companyId,
      companyName,
    });

    console.log("update employee use-case");
    const employeeExistsResult = await createEmployeeExists({
      employeeId,
    });
    console.log("employee_exists", employeeExistsResult);

    if (!employeeExistsResult) {
      console.info("Employee Entered Does not exist");
      throw new ObjectNotFoundError("Employee Entered Does not exist");
    }

    const isVerifiedEmployeeResults = await isVerifiedEmployee({
      employeeId,
    });

    if (!isVerifiedEmployeeResults) {
      console.info("Employee Entered is not a verified user");
      throw new InvalidAccessError("Employee Entered is not a verified user");
    }

    const companyExistsResult = await companyExists({ companyName });
    console.log("company_exists", companyExistsResult);

    if (!companyExistsResult) {
      console.info("Company Entered Does not exist");
      throw new ObjectNotFoundError("Company Entered Does not exist");
    }

    return await employeeDB.updateEmployee({
      employeeId,
      employeeName,
      jobTitle,
      companyId,
      companyName,
    });
  };

  function validateInputData({
    employeeId,
    employeeName,
    jobTitle,
    companyId,
    companyName,
  }) {
    const schema = Joi.object({
      employeeId: Joi.number().required().messages({
        "number.base": '"employeeId" must be a number',
      }),
      employeeName: Joi.string().required().messages({
        "string.base": '"employeeName" must be a string',
      }),
      jobTitle: Joi.string().required().messages({
        "string.base": '"jobTitle" must be a string',
      }),
      companyId: Joi.number().required().messages({
        "number.base": '"companyId" must be a number',
      }),
      companyName: Joi.string().required().messages({
        "string.base": '"companyName" must be a string',
      }),
    });

    const { error } = schema.validate({
      employeeId,
      employeeName,
      jobTitle,
      companyId,
      companyName,
    });

    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

module.exports = function makeFetchEmployeeRoles({
  Joi,
  employeeRolesDB,
  ValidationError,
  InvalidAccessError
}) {
  return async function createFetchEmployeeRoles({ employeeId }) {
    console.log("Entering Fetch employee roles use case");
    try {
      validateInputData({ employeeId });
      let roleIds = await employeeRolesDB.fetchEmployeeRole({ employeeId });
      roleIds = JSON.parse(roleIds)
      if (!roleIds || roleIds.length === 0) {
        throw new InvalidAccessError('Invalid Rights for creating Roles');
      }
      return roleIds;
    } catch (error) {
      throw error;
    }
  };

  function validateInputData({ employeeId }) {
    const schema = Joi.object({
      employeeId: Joi.number().required(),
    });
    const { error } = schema.validate({ employeeId });

    if (error) {
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

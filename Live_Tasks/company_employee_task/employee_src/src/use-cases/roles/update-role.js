module.exports = function makeUpdateRole({ rolesDB }) {
  return async function createUpdateRole({ roleId, permissions, employeeId }) {
    console.log("Entering update role usecase ");
    try {
      validateInputData({ roleId, permissions, employeeId });
      return await rolesDB.updateRole({ roleId, permissions, employeeId });
    } catch (error) {
      throw new Error(error);
    }
  };
  function validateInputData({ roleId, permissions, employeeId }) {
    const schema = Joi.object({
      roleId: Joi.number().integer().required(),
      permissions: Joi.array().items(Joi.string()).required(),
      employeeId: Joi.number().integer().required(),
    });

    const { error } = schema.validate({ roleId, permissions, employeeId });

    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

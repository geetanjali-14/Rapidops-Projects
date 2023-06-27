module.exports = function makeDeleteRole({ Joi, rolesDB, ValidationError }) {
  return async function createDeleteRole({ roleId }) {
    console.log("Entering delete role use case");
    try {
      validateInputData({ roleId });
      return await rolesDB.deleteRole(roleId);
    } catch (error) {
      throw new Error(error);
    }
  };

  function validateInputData({ roleId }) {
    const schema = Joi.object({
      roleId: Joi.number().integer().required(),
    });

    const { error } = schema.validate({ roleId });

    if (error) {
      console.error("@@@@@@@@@@@@@",error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

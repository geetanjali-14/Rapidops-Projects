module.exports = function makefetchRoleNameByRoleId({
  Joi,
  rolesDB,
  ValidationError,
}) {
  return async function createfetchRoleNameByRoleId({ roleId }) {
    console.log("Entering makefetchRoleNameByRoleId Usecase");
    validateInputData({ roleId });
    try {
      return await rolesDB.fetchRoleNameByRoleId({ roleId });
      
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
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

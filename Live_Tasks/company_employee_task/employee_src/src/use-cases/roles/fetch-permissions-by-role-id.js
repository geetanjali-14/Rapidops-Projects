module.exports = function makefetchPermissionsByRoleId({
    Joi,
    rolesDB,
    ValidationError,
  }) {
    return async function createfetchPermissionsByRoleId({roleId}) {
      console.log("Entering get role Id Usecase with input as ");
      validateInputData({roleId});
      try {
         return await rolesDB.fetchPermissionsByRoleId({roleId});
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
  
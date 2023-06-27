module.exports = function makefetchRoleId({
    Joi,
    rolesDB,
    ValidationError,
  }) {
    return async function createfetchRoleId({role}) {
      console.log("Entering get role Id Usecase with input as ");
      validateInputData({role});
      try {
         return await rolesDB.fetchRoleId({role});
      } catch (error) {
        throw new Error(error);
      }
    };
    function validateInputData({ role }) {
        const schema = Joi.object({
          role: Joi.string().required(),
        });
    
        const { error } = schema.validate({ role });
    
        if (error) {
          console.error(error);
          throw new ValidationError(`${error.details[0].message}`);
        }
      }
  };
  
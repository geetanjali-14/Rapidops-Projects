module.exports = function makeRoleExists({Joi, rolesDB ,ValidationError}) {
    return async function createRoleExists({ role }) {
      console.log("Entering Role Exists use case");
      try {
        validateInputData({ role });
        return await rolesDB.roleExists(role);
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
  
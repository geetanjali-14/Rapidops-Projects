module.exports = function makeDeleteRolesOfDeletedCompany({
    Joi,
    rolesDB,
    ValidationError,
  }) {
    return async function createDeleteRolesOfDeletedCompany({ companyId }) {
      console.info(`Inside delete roles when company is deleted use case`);
      validateInputData({ companyId });
      try {
        console.log("delete roles when company is deleted use-case");
        return await rolesDB.deleteRolesOfDeletedCompany({
          companyId,
        });
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  
    function validateInputData({ companyId }) {
      const schema = Joi.object({
        companyId: Joi.number().integer().required(),
      });
      const { error } = schema.validate({ companyId });
      if (error) {
        console.error(error);
        throw new ValidationError(`${error.details[0].message}`);
      }
    }
  };
  
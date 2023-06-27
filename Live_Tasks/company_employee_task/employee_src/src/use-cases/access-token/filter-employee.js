module.exports = function makeFilterEmployee({
  Joi,
  accessTokensDB,
  ValidationError,
}) {
  return async function createFilterEmployee({
    filters,
  }) {
    console.log("Entering filter employee UseCase");
    try {
      validateInputData({ filters});
      const filteredEmployees = await accessTokensDB.filterEmployees({
        filters,
      });
      return {
        status: "Success",
        message: "Filtered employees successfully",
        filteredEmployees: filteredEmployees,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  function validateInputData({ filters }) {
    const filterSchema = Joi.object({
      city: Joi.string().allow('').messages({
        'string.empty': `'city' must be a string`,
      }),
      device: Joi.string().allow('').messages({
        'string.empty': `'device' must be a string`,
      }),
      browser: Joi.string().allow('').messages({
        'string.empty': `'browser' must be a string`,
      }),
    });
  
    const schema = Joi.object({
      filters: filterSchema,
    });
  
    const { error } = schema.validate({ filters });
    if (error) {
      console.error(error);
      throw new ValidationError(error.details[0].message);
    }
  }  
  
};

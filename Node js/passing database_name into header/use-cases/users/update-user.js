module.exports = function makeUpdateUserUseCase({
   Joi,
   usersDb,
   }) {
  return async function updateUserUsecase({ id, name,database_name }) {
    console.info(`Inside update user use case`);
    validateInput({ id, name });
    try {
      const userDetails = await usersDb.updateUser({ id, name ,database_name});
      // console.log(userDetails);
      return userDetails;
    } 
    catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({ id, name }) {
    const schema = Joi.object({
      id: Joi.number().required().messages({
      'number.base':'"id" must be a number',
    }),
      name: Joi.string().required(),
    });

    const { error } = schema.validate({ id,name });
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

module.exports = function makeDeleteUserUseCase({
  usersDb,
  Joi
}) {
  return async function deleteUserUsecase({ id ,database_name}) {
    console.info(`Inside delete user use case`);
    validateInput({id});
    try{
      const deletedUserDetails= await usersDb.deleteUser({ id ,database_name});
      // console.log(deletedUserDetails)
      return deletedUserDetails;
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({id}) {
    const schema = Joi.object({
      id: Joi.number().required().messages({
        'number.base':'"id" must be a number',
      }),
    });
    const {error} = schema.validate({id});
    if (error) {
      console.error(error)
      throw new Error(`${error.details[0].message}`);
    }
  }
};

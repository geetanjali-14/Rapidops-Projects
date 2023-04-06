module.exports = function makeGetUserByIdUseCase({
    Joi,
    usersDb,
}){
    return async function getUserByIdUsecase({id}) {
        console.info(`Inside get user by id use case`);
        validateInput({id});
        try{
            const userDetails=await usersDb.getUserById({id});
            // console.log(userDetails)
            return userDetails;
        }
        catch (err) {
            console.error(err);
            throw err;
          }
    }
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
}
module.exports = function makeUserExistUseCase({
  Joi,
    usersDb,
}){
    return async function userExistUsecase({id,database_name}){
        console.info(id)
        validateInput({id});
        try{
            const result = await usersDb.userExists({id,database_name});
            return result;
        }
        catch(e){
            console.error(e);
            throw e;
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
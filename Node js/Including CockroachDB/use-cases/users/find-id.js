module.exports = function makeFindIdUserUseCase({
  Joi,
  usersDb,
}){
  return async function findId({email,database_name}){
      console.info("Inside find id use case");
      validateInput({email});
      try{
          const id = await usersDb.findId({email,database_name});
          // console.log(id);
          return id;
      }
      catch (err) {
          console.error(err);
          throw err;
        }
  }
  function validateInput({email}) {
      const schema = Joi.object({
        email: Joi.string().email().required(),
      });
  
      const {error} = schema.validate({email});
      if (error) {
        console.error(error)
        throw new Error(`${error.details[0].message}`);
      }
    }
}
module.exports = function makeCreateUserUseCase({
  Joi,
  usersDb,
}) {
  return async function createUserUsecase({
    name,
    email,
    password,
  }) {
    console.info(`Inside create user use case`);
    validateInput({name, email,password});
    try {
      // console.log("User");
      const newUserDetails= await usersDb.createUser({ 
        name, 
        email,
        password, 
      });
      return (newUserDetails);
    } 
    catch (err) {
      console.error(err);
      throw err;
    }
  };
    function validateInput({name, email, password}) {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      });
  
      const {error} = schema.validate({name, email, password});
      if (error) {
        console.error(error)
        throw new Error(`${error.details[0].message}`);
      }
    }
};

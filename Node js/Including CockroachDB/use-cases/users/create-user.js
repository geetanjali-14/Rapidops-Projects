module.exports = function makeCreateUserUseCase({ 
  Joi,
  usersDb }) {
  return async function createUserUsecase({
    name,
    email,
    password,
    access_token,
    refresh_token,
    expiry_date,
    database_name,
  }) {
    console.info(`Inside create user use case`);
    validateInput({ name, email, password });
    try {
      // console.log("User");
      const newUserDetails = await usersDb.createUser({
        name,
        email,
        password,
        access_token,
        refresh_token,
        expiry_date,
        database_name,
      });
      // console.log(newUserDetails)
      return newUserDetails;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({
    name,
    email,
    password,
    access_token,
    refresh_token,
    expiry_date,
  }) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      access_token: Joi.string().allow(null, ""),
      refresh_token: Joi.string().allow(null, ""),
      expiry_date: Joi.number(),
    });

    const { error } = schema.validate({
      name,
      email,
      password,
      access_token,
      refresh_token,
      expiry_date,
    });
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

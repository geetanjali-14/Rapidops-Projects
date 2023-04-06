module.exports = function makeCreateUserController({
  Joi,
  createUser,
  defaultFolders,
  findId,
}) {
  return async function createUserController(req, res) {
    console.info(`In create user controller`, req.body);
    try {
      validInput(req.body);
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      const database_name = req.headers["database_name"];

      const userDetails = await createUser({
        name,
        email,
        password,
        database_name,
      });
      // console.info(userDetails);
      const id = await findId({ email,database_name});
      await defaultFolders({ id ,database_name});
      console.info("ID inside default folders ", id);
      res.status(201).json({
        status:'Success',
        messege:'User Created and default Folders assigned to it.'
    })
      return userDetails;
    } catch (error) {
      res.status(500).json({
        status: "Error",
        messege: error.message,
      });
    }
  };
  function validInput(body) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = schema.validate(body);
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

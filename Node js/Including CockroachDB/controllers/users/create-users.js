module.exports = function makeCreateUserController({
  Joi,
  createUser,
  // defaultFolders,
  findId,
  producer,
}) {
  return async function createUserController(req, res) {
    console.info(`In create user controller`, req.body);
    try {
      validInput(req.body);
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const access_token = req.body.access_token;
      const refresh_token = req.body.refresh_token;

      const database_name = req.headers["database_name"];

      const userDetails = await createUser({
        name,
        email,
        password,
        access_token,
        refresh_token,
        database_name,
      });
      // console.info("userDetails",userDetails);

      const id = await findId({ email, database_name });
      // await defaultFolders({ id, database_name });
      await producer.connect();
      console.log("Producer connected to Kafka broker");
      await producer.send({
        topic: "my-topic",
        messages: [{ value: `${id}` }],
      });
      console.log(`Message ${id} sent to Kafka broker`);

      // console.info("ID inside default folders ", id);

      res.status(201).json({
        status: "Success",
        messege: "User's Default Folders Created",
      });
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
      access_token: Joi.string().allow(null, ""),
      refresh_token: Joi.string().allow(null, ""),
    });
    const { error } = schema.validate(body);
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

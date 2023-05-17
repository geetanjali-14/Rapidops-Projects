const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "create-default-folders",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
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
      console.log("Exiting create user Controller",userDetails)

      const user_id = await findId({ email, database_name });
      console.log("User's id in controller")

      await defaultFolders({ user_id, database_name });

      // const data = {
      //   userId: user_id,
      //   database_name,
      // };
      // const run = async () => {
      //   await producer.connect();
      //   console.log("Producer connected successfully");

      //   const message = {
      //     value: JSON.stringify(data),
      //   };

      //   await producer.send({
      //     topic: "mytopic",
      //     messages: [message],
      //   });
      //   console.log("Message sent:", message.value.toString());

      //   await producer.disconnect();
      // };

      run().catch(console.error);
      console.info("ID inside default folders ", id);

      res.status(201).json({
        status: "Success",
        messege: "User and User's Default Folders Created",
      });
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

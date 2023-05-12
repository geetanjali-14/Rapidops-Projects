module.exports = function makeCreateUserUseCase({ Joi, usersDb, Kafka }) {
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
      const result = await usersDb.createUser({
        name,
        email,
        password,
        access_token,
        refresh_token,
        expiry_date,
        database_name,
      });
      console.log("Exiting create user Usecase");
      const id = await usersDb.findId({ email, database_name });
      console.log("Exited find ID Usecase");
      await runProducer(id);
      return result;
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
  async function runProducer(userId) {
    // console.log("Inside Producer")
    const kafka = new Kafka({
      clientId: "user-default-folders",
      brokers: ["localhost:9092"],
    });
    const producer = kafka.producer();
    await producer.connect();
    // console.log(" Producer connected")
    await producer.send({
      topic: "userCreatedFolders",
      messages: [
        {
          value: userId.toString(),
        },
      ],
    });
    console.log("Message sent successfully", userId);
  }
};

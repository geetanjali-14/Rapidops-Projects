module.exports = function makeNextTokenProducer({ Kafka }) {
  return async function nextTokenProducer({
    labelName,
    nextToken,
    access_token,
    refresh_token,
    user_id,
    database_name,
  }) {
    console.info(`Inside nextToken producer in handler ${nextToken},
        ${labelName},
        ${access_token},
        ${refresh_token},
        ${user_id},
      }`);

    await runProducer(
      labelName,
      nextToken,
      access_token,
      refresh_token,
      user_id,
      database_name
    ).catch(console.error);
  };
  async function runProducer(
    labelName,
    nextToken,
    access_token,
    refresh_token,
    user_id,
    database_name
  ) {
    console.log(`Inside next Token Producer with nextToken ${nextToken}`);
    const kafka = new Kafka({
      clientId: "next-token-producer",
      brokers: ["localhost:9092"],
    });
    const producer = kafka.producer();
    await producer.connect();
    console.log("Producer connected in nextToken");

    await producer.send({
      topic: "fetch_email_topic",
      messages: [
        {
          value: JSON.stringify({
            labelName,
            access_token,
            refresh_token,
            nextToken,
            user_id,
            database_name
          }),
        },
      ],
    });
    console.log("Messages sent successfully from next Token");
  }
};

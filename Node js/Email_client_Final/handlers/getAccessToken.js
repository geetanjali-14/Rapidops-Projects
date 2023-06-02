module.exports = function makegetAccesToken({
  Kafka,
  OAuth2Client,
  updateUserAccesToken,
}) {
  const CLIENT_ID =
    "44296329626-rhukh8qus0oabhccsbhjlnfgqbicvnfc.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URI = "http://localhost:8085/auth/google/callback";

  const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  return async function getAccessToken() {
    database_name = "email_client";

    const kafka = new Kafka({
      clientId: "user-update-acces-token-producer",
      brokers: ["localhost:9092"],
    });
    const consumer = await kafka.consumer({ groupId: "myTokenConsumer" });

    await consumer.connect();
    // console.log(" Consumer connected @getAccessToken")

    await consumer.subscribe({ topic: "userCreatedAccessToken" });
    // console.log(" Consumer Subscribed @getAccessToken")

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("Message consumed at get getAccesToken ::", {
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        let result = JSON.parse(message.value);
        console.log("Related Users", result);

        for (let user of result.related_users) {
          console.log("user- ", user);

          const REFRESH_TOKEN = user.refresh_token;
          console.log("REFRESH_TOKEN", REFRESH_TOKEN);

          const { tokens } = await client.refreshToken(REFRESH_TOKEN);
          // console.log("Token", tokens);
          console.log("New access token: ", tokens.access_token);

          const updaterow = await updateUserAccesToken({
            user_id: user.user_id,
            access_token: tokens.access_token,
            expiry_date: tokens.expiry_date,
            database_name: "email_client",
          });
          // console.log("Row count :: ", updaterow.rowCount);
        }
      },
    });
  };
};

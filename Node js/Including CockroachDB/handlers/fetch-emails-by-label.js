module.exports = function makeFetchLabels({
  Kafka,
  google,
  // oauthCredentials,
  OAuth2Client,
  insertEmails,
  insertAttachments,
  nextTokenProducer,
  foldersDb,
}) {
  return async function fetchLabels() {
    console.log("Inside Consumer of fetch-labels");

    async function fetchEmailsByLabel(
      labelName,
      access_token,
      refresh_token,
      nextToken,
      user_id,
      database_name
    ) {
      const CLIENT_ID =
        "44296329626-rhukh8qus0oabhccsbhjlnfgqbicvnfc.apps.googleusercontent.com";
      const CLIENT_SECRET = "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";
      const REDIRECT_URI = "http://localhost:8085/auth/google/callback";

      const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

      client.setCredentials({
        access_token: access_token,
        refresh_token: refresh_token,
      });

      const gmail = google.gmail({ version: "v1", auth: client });

      const response = await gmail.users.messages.list({
        userId: "me",
        labelIds: labelName,
        maxResults: 100,
        nextPageToken: nextToken,
      });
      // console.log(`${labelName} data recieved in `, response.data);

      const emails = response.data.messages;
      const nextPageToken = response.data.nextPageToken;
      console.log(
        `fetched emails for ${labelName} with nextpageToken:${nextPageToken}`
      );

      for (let i = 0; i < emails.length; i++) {
        const message = await gmail.users.messages.get({
          userId: "me",
          id: emails[i].id,
          format: "FULL",
        });
        // console.log("end of fetchmail", message);
        const email_id = await insertEmails({
          message,
          user_id,
          database_name,
        });

        // console.log("email_id in fetch-email-handler.", email_id);
        await insertAttachments({ message, email_id, database_name });
      }

      return {
        emails: emails,
        newNextToken: nextPageToken,
      };
    }

    const kafka = new Kafka({
      clientId: "fetching_email",
      brokers: ["localhost:9092"],
    });
    const consumer = kafka.consumer({ groupId: "fetching_labels" });
    await consumer.connect();
    console.log("Consumer connected in fetch-emails");

    const topic = "fetch_email-topic";
    await consumer.subscribe({
      topic,
      fromBeginning: false,
    });
    console.log(" Consumer Subscribed fetch-emails");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("Message consumed at fetch emails :: ", {
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
        const {
          labelName,
          access_token,
          refresh_token,
          nextToken,
          user_id,
          database_name,
        } = JSON.parse(message.value.toString());
        // console.log(
        //   user_id,
        //   access_token,
        //   labelName,
        //   refresh_token + " GETTING IN FETCH EMAILS CONSUMER "
        // );

        const { emails, newNextToken } = await fetchEmailsByLabel(
          labelName,
          access_token,
          refresh_token,
          nextToken,
          user_id,
          database_name
        );
        console.log(
          `Fetched emails for label: ${labelName} and got newNextToken:${newNextToken}`
        );

        if (newNextToken) {
          console.log(
            `calling nextTokenPass passing nextToken:${newNextToken}`
          );
          await nextTokenProducer({
            labelName,
            nextToken: newNextToken,
            access_token,
            refresh_token,
            user_id,
            database_name,
          });
        } else {
          console.log(`All mails of ${labelName} are fetched.`);
          await foldersDb.markFetched({
            labelName,
            user_id,
            database_name: "email_client",
          });
        }

        // console.log("Emails:", emails);
        // console.log("newNextToken:", newNextToken);
      },
    });
  };
};

module.exports = function makeFetchLabels({
  Kafka,
  google,
  oauthCredentials,
  OAuth2Client,
  insertEmails,
}) {
  return async function fetchLabels() {
    console.log("Inside Consumer of fetch-labels");

    async function fetchEmailsByLabel(labelName, access_token, refresh_token,nextToken) {
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
      // console.log("Credentials set", labelName, access_token, refresh_token,nextToken);

      const response =await gmail.users.messages.list({
        userId: "me",
        labelIds: labelName,
        maxResults: 5,
        // nextPageToken:nextToken,
      });
      console.log("data recieved in ",response.data);

      const emails = response.data.messages;
      const nextPageToken = response.data.nextPageToken;

      for (let i = 0; i < emails.length; i++) {
        const message = await gmail.users.messages.get({
          userId: "me",
          id: emails[i].id,
          format: "FULL",
        });
        console.log("end of fetchmail",message);
        await insertEmails({message});
      }
      return {
        emails:emails,
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

    const producer = kafka.producer();
    await producer.connect();
    console.log("Producer connected in fetch-emails");

    // const nextTokenTopic = "next_token_topic";
    const topic = "fetch_email_topic";
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
        const {access_token, labelName, refresh_token ,nextToken }= JSON.parse(
          message.value.toString()
        );
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
          nextToken
        );
        console.log(`Fetched ${emails.length} emails for label: ${labelName}`);

        // if (newNextToken) {
        //   await producer.send({
        //     topic: "next_token_pass_topic",
        //     messages: [
        //       {
        //         value: JSON.stringify({
        //           topic,
        //           access_token,
        //           labelName,
        //           refresh_token,
        //           nextToken: newNextToken,
        //         }),
        //       },
        //     ],
        //   });
        // }


        // console.log("Emails:", emails);
        console.log("newNextToken:", newNextToken);
        console.log(`Finished fetching emails for label: ${labelName}`);
      },
    });
  };
};

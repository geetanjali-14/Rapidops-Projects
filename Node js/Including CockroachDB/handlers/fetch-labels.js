module.exports = function makeFetchLabels({ Kafka, axios, insertLabels }) {
  return async function fetchLabels() {
    console.log("Inside Consumer of fetch-labels");
    const kafka = new Kafka({
      clientId: "fetch-label-gmail",
      brokers: ["localhost:9092"],
    });
    const consumer = kafka.consumer({ groupId: "fetch-label-group" });
    const database_name = "email_client";
    await consumer.connect();
    console.log("Consumer connected in fetch-labels");
    await consumer.subscribe({
      topic: "fetch-label-topic",
      fromBeginning: false,
    });

    console.log(" Consumer Subscribed fetch-labels");
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("Message consumed at fetchLabels :: ", {
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
        const result = JSON.parse(message.value.toString());
        console.log(result);
        console.log(result.user_id, result.access_token);

        console.log(result.user_id + " GETTING ID IN CONSUMER ");
        const access_token = result.access_token;
        const user_id = result.user_id;

        const url = "https://gmail.googleapis.com/gmail/v1/users/me/labels";
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        // console.log(response.data.labels);
        const labels = response.data.labels;
        console.log(labels);

        //Inserting labels in folders table

        const folderNames = labels.map((labels) => labels.name);
        // console.log(folderNames)
        await insertLabels({ folderNames, user_id, database_name });
      },
    });
  };
};

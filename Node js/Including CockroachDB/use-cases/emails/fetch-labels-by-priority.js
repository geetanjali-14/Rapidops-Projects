module.exports = function makeFetchLabelsByPriorityUseCase({
  Kafka,
  fetchLabelsByPriority,
}) {
  return async function FetchLabelByPriority({
    user_id,
    access_token,
    refresh_token,
  }) {
    console.log("In fetch Labels-Priority Use Case.");
    try {
      const labelsPriorityMap = {};
      const database_name = "email_client";

      const result = await fetchLabelsByPriority({ user_id, database_name });
      result.rows.forEach((row) => {
        const labelName = row.name;
        const priority = row.folders_priority;
        labelsPriorityMap[priority] = labelName;
      });
      console.log("labelsPriorityMap:", labelsPriorityMap);

      // for (const priority in labelsPriorityMap) {
        // const labelName = labelsPriorityMap[priority];
        const labelName ="STARRED";
        
        let nextToken = null;
        await runProducer(
          labelName,
          access_token,
          refresh_token,
          nextToken,
          user_id,
          database_name
        ).catch(console.error);
      // }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  async function runProducer(
    labelName,
    access_token,
    refresh_token,
    nextToken,
    user_id,
    database_name
  ) {
    console.log("Inside fetch Labels-Priority Producer");
    const kafka = new Kafka({
      clientId: "fetching_email",
      brokers: ["localhost:9092"],
    });
    const producer = kafka.producer();
    await producer.connect();
    console.log("Producer connected in fetch-emails");

    // console.log(
    //   `Producing message for label: ${labelName}, priority: ${priority}`
    // );
    await producer.send({
      topic:"fetch_email-topic",
      messages: [
        {
          value: JSON.stringify({
            access_token,
            labelName,
            refresh_token,
            nextToken,
            user_id,
            database_name
          }),
        },
      ],
    });
    console.log(`Messages sent successfully for ${labelName} label`);
  }
};

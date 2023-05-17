module.exports =function makeFetchGmailFoldersUseCase({
  Kafka,}) {
    return async function fetchGmailFolders({user_id,access_token,refresh_token}) {
      
      try {
        console.info(`Inside fetchGmailFolders use case`);
        await runProducer({user_id,access_token,refresh_token});
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      async function runProducer({user_id, access_token,refresh_token}) {
        console.log("Inside Producer of fetch-labels")
        const kafka = new Kafka({
          clientId: "fetching-labels_client",
          brokers: ["localhost:9092"],
        });
        const producer = kafka.producer();
        await producer.connect();
        console.log("Producer connected in fetch-labels")
        await producer.send({
          topic: "fetch-labels-group",
          messages: [
            {
              value: JSON.stringify({ user_id, access_token,refresh_token }),
            },
          ],
        });
        // console.log("Messages sent successfully:", { user_id, access_token,refresh_token});
      }
      
}


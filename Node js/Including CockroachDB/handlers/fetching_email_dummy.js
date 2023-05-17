const { value } = await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log("Message consumed at fetch emails:", {
      partition,
      offset: message.offset,
      value: message.value.toString(),
    });

    const { emails, newNextToken } = await fetchEmailsByLabel(
      labelName,
      access_token,
      refresh_token,
      JSON.parse(message.value.toString()).nextToken
    );
    nextToken = newNextToken;
      if (nextToken) {
        await producer.send({
          topic: "fetch_emails_topic",
          messages: [
            {
              value: JSON.stringify({
                user_id,
                access_token,
                labelName,
                refresh_token,
                nextToken,
              }),
            },
          ],
        });
      }
    },
  });
  while (nextToken);


















  
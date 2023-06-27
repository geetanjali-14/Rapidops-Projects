module.exports = function makeEmployeeCreationEmailSendHandler({
  Kafka,
  createEmployeeCreationEmailSend,
}) {
  return async function employeeCreationEmailSend() {
    const kafka = new Kafka({
      clientId: "send-email-on-employee-creation",
      brokers: ["localhost:9092"],
    });

    console.log("Inside Consumer");
    const consumer = kafka.consumer({
      groupId: "employee-creation-email-send",
    });

    await consumer.connect();
    console.log("Consumer connected");

    await consumer.subscribe({
      topic: "email-sent-on-employee-creation",
      fromBeginning: false,
    });
    console.log("Consumer Subscribed");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("Message consumed at employee_creation_email:", {
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        const parsedMessage = JSON.parse(message.value.toString());
        console.log(parsedMessage)
        const employeeEmail = parsedMessage.employeeEmail;
        const companyId = parsedMessage.companyId;

        console.log(`${employeeEmail}, ${companyId} in consumer.`);

        await createEmployeeCreationEmailSend({ employeeEmail, companyId });
      },
    });
  };
};

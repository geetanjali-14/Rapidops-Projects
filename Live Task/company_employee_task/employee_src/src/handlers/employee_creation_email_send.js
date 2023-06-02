module.exports = function makeEmployeeCreationEmailSendHandler({
  Kafka,
  createEmployeeCreationEmailSend,
}) {
  return async function employeeCreationEmailSend() {
    const kafka = new Kafka({
      clientId: "send-email-on-email-creation",
      brokers: ["localhost:9092"],
    });

    console.log("Inside Consumer");
    const consumer = kafka.consumer({
      groupId: "employee_creation_email_send",
    });

    await consumer.connect();
    console.log("Consumer connected");

    await consumer.subscribe({
      topic: "email_sent_on_employee_creation",
      fromBeginning: true,
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
        const employee_email = parsedMessage.employee_email;
        const company_id = parsedMessage.company_id;

        console.log(`${employee_email}, ${company_id} in consumer.`);

        await createEmployeeCreationEmailSend({ employee_email, company_id });
      },
    });
  };
};

// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({
//   clientId: 'create-default-folders',
//   brokers: ['localhost:9092']
// })

// const consumer = kafka.consumer({ groupId: 'test-group' })

// const run = async () => {
//   await consumer.connect()
//   await consumer.subscribe({ topic: 'my-topic' })

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log({
//         partition,
//         offset: message.offset,
//         value: message.value.toString(),
//       })
//     },
//   })
// }

// run().catch(console.error)
const { Kafka } = require('kafkajs');
const Users = require('../use-cases');
const Joi = require('joi')
console.log(Users.users.defaultFolders)
const kafka = new Kafka({
  clientId: 'create-default-folders',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'my-group' });

const run = async () => {
await consumer.connect();
await consumer.subscribe({ topic: 'mytopic' ,fromBeginning: false});

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const id = JSON.parse(message.value.toString());
    console.log(id.userId);
    const result = Users.users.defaultFolders({id:id.userId}
      );
    },
  });
};

run().catch(console.error);
const { Kafka } = require('kafkajs')
const { defaultFolders } = require("../use-cases").folders
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic' })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await defaultFolders({id: +message.value.toString()})
      console.log('inside consumer.')
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
        data: "hello"
      })
    },
  })
}

run().catch(console.error)

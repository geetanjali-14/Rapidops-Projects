module.exports = function makecreateDefaultFolderHandler({
    Kafka,
    usersDb,
})
{
    return async function defaultFolders()
    {
        const kafka=new Kafka({
            clientId:'user-default-folders',
            brokers:['localhost:9092']
        });
        console.log("Inside Consumer")
        const consumer = kafka.consumer({ groupId:'myFoldersConsumer' });
        
        await consumer.connect();
        console.log(" Consumer connected #defaultFolders")
        await consumer.subscribe({ topic:'userCreatedFolders', fromBeginning: false});
        console.log(" Consumer Subscribed #defaultFolders")
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log("Message consumed at createDefaultFolderHandler :: ",{
                    partition,
                    offset: message.offset,
                    value: message.value.toString()
                });
                console.log("hey");
                await usersDb.defaultFolders( { user_id:(message.value.toString()),database_name:'email_client' } );
                console.log("default folders use-case end");
            }
        })
    }
}
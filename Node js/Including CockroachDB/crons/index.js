const CronJob = require('cron').CronJob;
const { Kafka } = require('kafkajs');
const { user } = require('../use-cases');

const getAllRelatedUser = user.getAllRelatedUser;
const database_name = "email_client";

function runCron()
{
    const job = new CronJob('*/2 * * * *',async function() 
    {
        const current_time=new Date().getTime();
        let related_users = await getAllRelatedUser({current_time,database_name});
        
        await runProducer({related_users});
        console.log('Running a task every 2 minutes::',JSON.stringify({related_users}));

    });
    
    job.start();
}

async function runProducer({related_users})
{
    const kafka = new Kafka({
        clientId:'user-update-acces-token-producer',
        brokers:['localhost:9092']
    })
    const producer = kafka.producer();
    
    await producer.connect();
    await producer.send({
        topic: 'userCreatedAccessToken',
        messages: [
            {
                value:JSON.stringify({related_users})
            }
        ]
    })
}


runCron();
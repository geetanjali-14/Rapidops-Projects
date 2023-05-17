const CronJob = require('cron').CronJob;
// const { Kafka } = require('kafkajs');
const { users } = require('../use-cases/index');
const {OAuth2Client} = require('google-auth-library')
const updateUserAccesToken = users.updateUserAccesToken
const getAllRelatedUser = users.getAllRelatedUser
// console.log(users)
// const getAllRelatedUser 
const database_name = "email_client";


const CLIENT_ID ="44296329626-rhukh8qus0oabhccsbhjlnfgqbicvnfc.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URI = "http://localhost:8085/auth/google/callback";

  const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
function runCron()
{
    const job = new CronJob('*/6 * * * *',async function() 
    {
        const current_time=new Date().getTime();
        let related_users = await getAllRelatedUser({current_time,database_name});
        
        // await runProducer({related_users});
        console.log('Running a task every 4 seconds::',JSON.stringify({related_users}));

        for (let user of related_users) {
            console.log("user- ", user);
  
            const REFRESH_TOKEN = user.refresh_token;
            console.log("REFRESH_TOKEN",REFRESH_TOKEN)
  
            const { tokens } = await client.refreshToken(REFRESH_TOKEN);
            // console.log("Token", tokens);
            console.log("New access token: ", tokens.access_token);
            
            const updaterow = await updateUserAccesToken({
              user_id: user.user_id,
              access_token: tokens.access_token,
              expiry_date: tokens.expiry_date,
              database_name: "email_client",
            });
            // console.log("Row count :: ", updaterow.rowCount);
          }





    });
    
    job.start();
}

// async function runProducer({related_users})
// {
//     const kafka = new Kafka({
//         clientId:'user-update-acces-token-producer',
//         brokers:['localhost:9092']
//     })
//     const producer = kafka.producer();
    
//     await producer.connect();
//     await producer.send({
//         topic: 'userCreatedAccessToken',
//         messages: [
//             {
//                 value:JSON.stringify({related_users})
//             }
//         ]
//     })
// }


runCron();
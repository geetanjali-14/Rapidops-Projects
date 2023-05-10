console.log("In index of handlers...");

const {Kafka} = require('kafkajs');
const CronJob = require('cron').CronJob;
const dataAccess = require('../data-access');
const { OAuth2Client } = require("google-auth-library");
const defaultFolder = require('../use-cases/folders/default-folders');


const makecreateDefaultFolderHandler = require('./create-user-default-folder')
const createDefaultFoldersHandlers = makecreateDefaultFolderHandler({
    Kafka,
    usersDb:dataAccess.folders
});

createDefaultFoldersHandlers();

const makegetAccesToken = require('./getAccessToken')
const getAccesToken = makegetAccesToken({
    OAuth2Client,
    CronJob,
    Kafka,
    updateUserAccesToken:defaultFolder.updateUserAccesToken
})

getAccesToken();

module.exports = Object.freeze({
    createDefaultFoldersHandlers,
    makegetAccesToken,
})
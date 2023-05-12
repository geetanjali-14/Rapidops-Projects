console.log("In index of handlers...");

const {Kafka} = require('kafkajs');
const CronJob = require('cron').CronJob;
const axios = require('axios');
const dataAccess = require('../data-access');
// const useCases = require('../../use-cases');
const { OAuth2Client } = require("google-auth-library");
const {users,folders} = require('../use-cases/index');
// console.log(users);

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
    updateUserAccesToken: users.updateUserAccesToken
})
getAccesToken();

const makeFetchLabels = require('./fetch-labels')
const fetchLabels = makeFetchLabels({
    Kafka,
    axios,
    foldersDb:dataAccess.folders,
    insertLabels:folders.insertLabels
})
fetchLabels();

module.exports = Object.freeze({
    createDefaultFoldersHandlers,
    makegetAccesToken,
    fetchLabels,
})

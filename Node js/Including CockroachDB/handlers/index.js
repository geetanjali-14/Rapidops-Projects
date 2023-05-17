console.log("In index of handlers...");

const { Kafka } = require("kafkajs");
const CronJob = require("cron").CronJob;
const axios = require("axios");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const dataAccess = require("../data-access");
const {oauthCredentials} = require("../controllers/oauth/index");
const { users, folders, emails } = require("../use-cases/index");

const makecreateDefaultFolderHandler = require("./create-user-default-folder");
const createDefaultFoldersHandlers = makecreateDefaultFolderHandler({
  Kafka,
  usersDb: dataAccess.folders,
});
createDefaultFoldersHandlers();

const makegetAccesToken = require("./getAccessToken");
const getAccesToken = makegetAccesToken({
  OAuth2Client,
  CronJob,
  Kafka,
  updateUserAccesToken: users.updateUserAccesToken,
});
// getAccesToken();

const makeFetchLabels = require("./fetch-labels");
const fetchLabels = makeFetchLabels({
  Kafka,
  axios,
  foldersDb: dataAccess.folders,
  insertLabels: folders.insertLabels,
  FetchLabelByPriority: emails.FetchLabelByPriority,
});
fetchLabels();

const makeFetchEmails = require("./fetch-emails-by-label");
const fetchEmails = makeFetchEmails({
  Kafka,
  google,
  oauthCredentials,
  OAuth2Client,
  insertEmails:emails.insertEmail
});
fetchEmails();

module.exports = Object.freeze({
  createDefaultFoldersHandlers,
  makegetAccesToken,
  fetchLabels,
  fetchEmails,
});

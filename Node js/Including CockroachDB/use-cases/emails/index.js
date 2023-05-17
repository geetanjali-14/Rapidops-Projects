const makeFetchLabelsByPriorityUseCase = require("./fetch-labels-by-priority");
const makeInsertEmailUseCase=require('./insert-email')
const { Kafka } = require("kafkajs");
const dataAccess = require('../../data-access');

const FetchLabelByPriority = makeFetchLabelsByPriorityUseCase({
  Kafka,
  fetchLabelsByPriority: dataAccess.folders.fetchLabelsByPriority,
});

const insertEmail = makeInsertEmailUseCase({
  insertEmails:dataAccess.emails.insertEmails
});

module.exports = Object.freeze({
  FetchLabelByPriority,
  insertEmail
});

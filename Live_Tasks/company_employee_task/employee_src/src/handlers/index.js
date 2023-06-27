console.log("In index of handlers...");
const { Kafka } = require("kafkajs");
const useCases = require("../use-cases");
const {employee}=require('../use-cases')
const makeEmployeeCreationEmailSendHandler = require("./employee-creation-email-send");
const createEmployeeCreationEmailSendHandler = makeEmployeeCreationEmailSendHandler({
  Kafka,
  createEmployeeCreationEmailSend:employee.createEmployeeCreationEmailSend,
});
createEmployeeCreationEmailSendHandler();

module.exports = Object.freeze({
    createEmployeeCreationEmailSendHandler,
  });

  
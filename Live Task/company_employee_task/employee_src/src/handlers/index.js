console.log("In index of handlers...");
const { Kafka } = require("kafkajs");
const useCases = require("../use-cases");
const {employee}=require('../use-cases')
const makeEmployeeCreationEmailSendHandler = require("./employee_creation_email_send");
const createEmployeeCreationEmailSendHandler = makeEmployeeCreationEmailSendHandler({
  Kafka,
  createEmployeeCreationEmailSend:employee.createEmployeeCreationEmailSendUseCase,
});
createEmployeeCreationEmailSendHandler();

module.exports = Object.freeze({
    createEmployeeCreationEmailSendHandler,
  });

  
const Joi = require('joi');
const useCases = require('../../use-cases');


const makeCreateUserController = require('./create-users');

const createCreateuserController = makeCreateUserController({
    Joi,
    createUser: useCases.users.createUser,
});

module.exports = Object.freeze({
    createCreateuserController,
});
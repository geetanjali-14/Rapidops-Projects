const dataAccess = require('../../data-access');
const makeCreateUserUseCase = require('./create-user');

const createUser = makeCreateUserUseCase({
    usersDb: dataAccess.users
});

module.exports = Object.freeze({
    createUser,
});
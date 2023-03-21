const Joi=require('joi');
const dataAccess = require('../../data-access');
const makeCreateUserUseCase = require('./create-user');
const makeShowUserUseCase = require('./show-user');
const makeDeleteUserUseCase=require('./delete-user');
const makeUpdateUserUseCase=require('./update-user');
const makeGetUserByIdUseCase=require('./get-user-by-id');
const makeFindIdUserUseCase=require('./find-id');
const makeUserExistUseCase = require('./user-exists');

const userExists = makeUserExistUseCase({
    usersDb: dataAccess.users,
    Joi
})
const createUser = makeCreateUserUseCase({
    Joi,
    usersDb: dataAccess.users,
});
const showUser = makeShowUserUseCase({
    usersDb: dataAccess.users
});
const deleteUser = makeDeleteUserUseCase({
    Joi,
    usersDb: dataAccess.users,
});
const updateUser = makeUpdateUserUseCase({
    Joi,
    usersDb: dataAccess.users,
});
const getUserById = makeGetUserByIdUseCase({
    usersDb: dataAccess.users,
    Joi
});
const findId = makeFindIdUserUseCase({
    usersDb: dataAccess.users,
    Joi,
});
module.exports = Object.freeze({
    createUser,
    showUser,
    deleteUser,
    updateUser,
    getUserById,
    findId,
    userExists,
});
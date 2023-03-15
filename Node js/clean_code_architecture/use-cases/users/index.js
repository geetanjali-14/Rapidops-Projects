const Joi=require('joi');
const dataAccess = require('../../data-access');
const makeCreateUserUseCase = require('./create-user');
const makeShowUserUseCase = require('./show-user');
const makeDeleteUserUseCase=require('./delete-user');
const makeUpdateUserUseCase=require('./update-user');
const makeGetUserByIdUseCase=require('./get-user-by-id');
const makeFindIdUserUseCase=require('./find-id');
const makeDefaultFolderUseCase=require('./default-folders');
const makeUserExistUseCase = require('./user-exists');

const userExists = makeUserExistUseCase({
    usersDb: dataAccess.users
})
const createUser = makeCreateUserUseCase({
    usersDb: dataAccess.users
});
const showUser = makeShowUserUseCase({
    usersDb: dataAccess.users
});
const deleteUser = makeDeleteUserUseCase({
    usersDb: dataAccess.users
});
const updateUser = makeUpdateUserUseCase({
    usersDb: dataAccess.users
});
const getUserById = makeGetUserByIdUseCase({
    usersDb: dataAccess.users
});
const findId = makeFindIdUserUseCase({
    usersDb: dataAccess.users
});
const defaultFolders = makeDefaultFolderUseCase({
    usersDb: dataAccess.users
});
module.exports = Object.freeze({
    createUser,
    showUser,
    deleteUser,
    updateUser,
    getUserById,
    findId,
    defaultFolders,
    userExists,
});
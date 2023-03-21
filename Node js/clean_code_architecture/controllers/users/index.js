// console.log("user controller index.js")
const Joi = require('joi');
const useCases = require('../../use-cases');

const makeshowUserController = require('./get-all-users');
const createShowUserController = makeshowUserController({
    Joi,
    showUser: useCases.users.showUser,
});

const makeCreateUserController = require('./create-users');
const createCreateuserController = makeCreateUserController({
    Joi,
    createUser: useCases.users.createUser,
    defaultFolders: useCases.folders.defaultFolders,
    findId: useCases.users.findId,
});

const makeDeleteUserController = require('./delete-users');
const createDeleteuserController = makeDeleteUserController({
    Joi,
    deleteUser: useCases.users.deleteUser,
    userExists:useCases.users.userExists,
});

const makeUpdateUserController = require('./update-user');
const createUpdateuserController = makeUpdateUserController({
    Joi,
    updateUser: useCases.users.updateUser,
    userExists:useCases.users.userExists,
});

const makeGetUserByIdController = require('./get-user-by-id');
const createGetuserByIdController = makeGetUserByIdController({
    Joi,
    getUserById: useCases.users.getUserById,
    userExists:useCases.users.userExists,
});


module.exports = Object.freeze({
    createCreateuserController,
    createShowUserController,
    createDeleteuserController,
    createUpdateuserController,
    createGetuserByIdController,
});
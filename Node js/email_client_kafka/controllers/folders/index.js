// console.log("folder controller index.js")
const Joi = require("joi");
const useCases = require("../../use-cases");

const makeCreateFolderController = require("./create-new-folder");
const makeDeleteFolderController = require("./delete-folders");
const makeUpdateFolderController = require("./update-folder");
const makeGetFolderByIdController = require("./get-folders-by-id");

const createCreatefolderController = makeCreateFolderController({
  Joi,
  createFolder: useCases.folders.createFolder,
  folderExists: useCases.folders.folderExists,
});

const createDeletefolderController = makeDeleteFolderController({
  Joi,
  deleteFolder: useCases.folders.deleteFolder,
  folderExistsByFolderId: useCases.folders.folderExistsByFolderId,
});

const createUpdatefolderController = makeUpdateFolderController({
  Joi,
  updateFolder: useCases.folders.updateFolder,
  folderExists: useCases.folders.folderExists,
  folderNameExists: useCases.folders.folderNameExists,
});

const createGetfolderByIdController = makeGetFolderByIdController({
  Joi,
  getFolderById: useCases.folders.getFolderById,
  userExists: useCases.users.userExists,
});

module.exports = Object.freeze({
  createCreatefolderController,
  createDeletefolderController,
  createUpdatefolderController,
  createGetfolderByIdController,
});

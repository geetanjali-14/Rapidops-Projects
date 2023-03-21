const dataAccess = require("../../data-access");
const makeCreateFolderUseCase = require("./create-folder");
const makeDeleteFolderUseCase = require("./delete-folder");
const makeUpdateFolderUseCase = require("./update-folder");
const makeGetFolderByIdUseCase = require("./get-folders-by-id");
const makeFolderExistUseCase = require("./folder-exists");
const makeDefaultFolderUseCase=require('./default-folders');
const makeFolderExistByFilderIdUseCase = require("./folder-exist-by-folder-id");
const Joi=require('joi')

const defaultFolders = makeDefaultFolderUseCase({
  Joi,
  foldersDb: dataAccess.folders,
});
const folderExists = makeFolderExistUseCase({
  Joi,
  foldersDb: dataAccess.folders,
});
const folderExistsByFolderId = makeFolderExistByFilderIdUseCase({
  Joi,
  foldersDb: dataAccess.folders,
});

const createFolder = makeCreateFolderUseCase({
  Joi,
  foldersDb: dataAccess.folders,
});
const deleteFolder = makeDeleteFolderUseCase({
  Joi,
  foldersDb: dataAccess.folders,
});
const updateFolder = makeUpdateFolderUseCase({
  Joi,
  foldersDb: dataAccess.folders,
});
const getFolderById = makeGetFolderByIdUseCase({
  Joi,
  foldersDb: dataAccess.folders,
});
module.exports = Object.freeze({
  getFolderById,
  createFolder,
  deleteFolder,
  updateFolder,
  folderExists,
  defaultFolders,
  folderExistsByFolderId,
});

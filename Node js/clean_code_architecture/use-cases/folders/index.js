const dataAccess = require("../../data-access");
const makeCreateFolderUseCase = require("./create-folder");
const makeDeleteFolderUseCase = require("./delete-folder");
const makeUpdateFolderUseCase = require("./update-folder");
const makeGetFolderByIdUseCase = require("./get-folders-by-id");
const makeFolderExistUseCase = require("./folder-exists");

const folderExists = makeFolderExistUseCase({
  foldersDb: dataAccess.folders,
});

const createFolder = makeCreateFolderUseCase({
  foldersDb: dataAccess.folders,
});
const deleteFolder = makeDeleteFolderUseCase({
  foldersDb: dataAccess.folders,
});
const updateFolder = makeUpdateFolderUseCase({
  foldersDb: dataAccess.folders,
});
const getFolderById = makeGetFolderByIdUseCase({
  foldersDb: dataAccess.folders,
});
module.exports = Object.freeze({
  getFolderById,
  createFolder,
  deleteFolder,
  updateFolder,
  folderExists,
});

const dataAccess = require("../../data-access");
const Joi=require('joi')
const {Kafka} = require('kafkajs')
const makeCreateFolderUseCase = require("./create-folder");
const makeDeleteFolderUseCase = require("./delete-folder");
const makeUpdateFolderUseCase = require("./update-folder");
const makeGetFolderByIdUseCase = require("./get-folders-by-id");
const makeFolderExistUseCase = require("./folder-exists");
const makeDefaultFolderUseCase=require('./default-folders');
const makeFolderExistByFilderIdUseCase = require("./folder-exist-by-folder-id");
const makeFetchGmailFoldersUseCase = require('./fetchGmailFolders')
const makeinsertLabelsUseCase=require('./insert-labels')
// const makeInsertEmailFolderIdUseCase=require('../junction/insert_email-folder_ids')

// const insert_email_folder_id=makeInsertEmailFolderIdUseCase({
//   junctionDb:dataAccess.email_folder_junction
// })

const defaultFolders = makeDefaultFolderUseCase({
  Joi,
  foldersDb: dataAccess.folders.defaultFolders,
  // insert_email_folder_id,
});
const fetchGmailFolders = makeFetchGmailFoldersUseCase({
  Kafka,
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
const insertLabels=makeinsertLabelsUseCase({
    foldersDb: dataAccess.folders,
    // insert_email_folder_id,
})


module.exports = Object.freeze({
  getFolderById,
  createFolder,
  deleteFolder,
  updateFolder,
  folderExists,
  defaultFolders,
  folderExistsByFolderId,
  fetchGmailFolders,
  insertLabels
});

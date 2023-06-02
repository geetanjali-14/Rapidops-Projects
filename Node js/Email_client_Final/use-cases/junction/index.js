const dataAccess = require('../../data-access');
const makeInsertEmailFolderIdUseCase=require('./insert_email-folder_ids')

const insert_email_folder_id=makeInsertEmailFolderIdUseCase({
    junctionDb:dataAccess.email_folder_junction
})

module.exports=Object.freeze({
    insert_email_folder_id,
})
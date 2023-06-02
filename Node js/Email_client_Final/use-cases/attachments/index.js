const makeInsertAttacmentsUseCase=require('./insert-attachments')
const dataAccess = require('../../data-access');

const insertAttachments = makeInsertAttacmentsUseCase({
  insertAttachmentsDb:dataAccess.attachements.insertAttachments
});

module.exports = Object.freeze({
  insertAttachments
});

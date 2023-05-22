module.exports = function makeInsertAttachmentsUseCase({ insertAttachmentsDb }) {
  return async function insertAttachments({ message ,email_id,database_name}) {
    try {
      console.info("insert Attachments use case");

      const { parts } = message.data.payload;

      for (const part of parts) {
        const { mimeType, filename, body, body: { attachmentId }, body: { size } } = part;

        if (part.filename && part.body.attachmentId) {
          const message_attachment_id = attachmentId;
          const file_name = filename;
          const attachment_size = size;
          const type = mimeType;
          const createdAt = new Date(parseInt(message.data.internalDate)).toISOString();
          const updatedAt = new Date().toISOString();

console.log("email_id in use case of attachments: ",email_id);
          await insertAttachmentsDb({
            database_name,
            file_name,
            email_id,
            size: attachment_size,
            type,
            createdAt,
            updatedAt,
            message_attachment_id,
          });
        }
      }

    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};

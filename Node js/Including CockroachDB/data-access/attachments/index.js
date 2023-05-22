const attachments_table = "attachments";
function makeAttachmentsDbMethods({ connection }) {
  return Object.freeze({
    insertAttachments,
  });

  async function insertAttachments({ database_name,
    file_name,
    email_id,
    size,
    type,
    createdAt,
    updatedAt, 
    message_attachment_id
  }) {
    // console.log("Inside insert attachments data-access in email_id ",email_id);
    try {
        await connection.query(
          `insert into ${database_name}.${attachments_table} ( file_name ,email_id,size , type , created_at , updated_at,message_attachment_id) values ($1,$2,$3,$4,$5,$6,$7)`,
          [file_name,email_id, size, type, createdAt, updatedAt,message_attachment_id]
        );
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = makeAttachmentsDbMethods;

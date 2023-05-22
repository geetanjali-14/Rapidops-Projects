const email_table = "email";
function makeEmailDbMethods({ connection }) {
  return Object.freeze({
    insertEmails,
    fetchAllEmails,
  });

  async function insertEmails({
    database_name,
    email_id,
    bodyHTML,
    subject,
    threadId,
    createdAt,
    updatedAt,
    user_id,
    isRead,
    isReplyTo,
    snippet,
    isArchived,
    isTrash,
  }) {
    console.log("Inside insert email data-access of", user_id);
      const result = await connection.query(
        `insert into ${database_name}.${email_table} (user_id, body, subject, thread_id, created_at, updated_at, is_read, message_id, is_reply_to, snippet, is_archieve, is_trash) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING email_id`,
        [
          user_id,
          bodyHTML,
          subject,
          threadId,
          createdAt,
          updatedAt,
          isRead,
          email_id,
          isReplyTo,
          snippet,
          isArchived,
          isTrash,
        ]
      );
      const inserted_id = result.rows[0].email_id;
      // console.log("Inserted ID:", inserted_id);
      return inserted_id;
  }

  async function fetchAllEmails({ user_id, database_name }) {
    console.info("Inside fetch Emails data-access");
    {
      const result = await connection.query(
        `select email_id, user_id from ${database_name}.${folder_table} where user_id=$1;`,
        [user_id]
      );
      return result;
    }
  }
}

module.exports = makeEmailDbMethods;

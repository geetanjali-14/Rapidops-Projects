module.exports = function makeInsertEmailUseCase({ insertEmailsDb }) {
  return async function insertEmail({ message, user_id, database_name }) {
    try {
      console.info("insert Emails use case");
      const {
        id: email_id,
        payload: { headers, body },
        threadId,
        internalDate,
      } = message.data;

      console.log(message);

      const findHeader = (name) => {
        const header = headers.find(
          (h) => h.name.toLowerCase() === name.toLowerCase()
        );
        return header ? header.value : "";
      };

      const subject = findHeader("subject");
      const createdAt = new Date(parseInt(internalDate));

      let updatedAt = message.headers.date;
      const date = new Date(updatedAt);
      updatedAt = date.toISOString();

      const isRead = message.data.labelIds.includes("UNREAD");
      // const messageId = findHeader("message-id");
      const isReplyTo = findHeader("in-reply-to");

      // const isScheduledAt = new Date().toUTCString();

      const snippet = message.data.snippet;
      const isArchived = message.data.labelIds.includes("ARCHIVED");
      const isTrash = message.data.labelIds.includes("TRASH");
      let bodyHTML;

      if (
        message &&
        message.data &&
        message.data.payload &&
        message.data.payload.body
      ) {
        const emailHTML = message.data.payload.body.data;
        if (emailHTML) {
          bodyHTML = Buffer.from(emailHTML, "base64").toString("utf-8");
        } else {
          console.log("Email HTML content is missing.");
        }
      } else {
        console.log("Email response is invalid or incomplete.");
      }

      // console.log("Body:",bodyHTML);

      const inserted_id=await insertEmailsDb({
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
      });
      return inserted_id;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};
// console.log("Email ID:", email_id);
// console.log("Subject:", subject);
// console.log("Thread ID:", threadId);
// console.log("Created At:", createdAt);
// console.log("Updated At:", updatedAt);
// console.log("User ID:", user_id);
// console.log("Is Read:", isRead);
// console.log("Message ID:", messageId);
// console.log("Is Reply To:", isReplyTo);
// console.log("Is Scheduled At:", isScheduledAt);
// console.log("Snippet:", snippet);
// console.log("Is Archived:", isArchived);
// console.log("Is Trash:", isTrash);

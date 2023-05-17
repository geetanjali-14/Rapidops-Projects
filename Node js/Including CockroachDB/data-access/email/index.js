const folder_table = "email";
function makeEmailDbMethods({ connection }) {
    return Object.freeze({
      insertEmails,
    });

    async function insertEmails({ user_id, database_name }) {
      console.log("Inside default folder data-access", user_id);
      try {
      }
      catch (err) {
        console.log(err);
      }
    }
}
module.exports = makeEmailDbMethods;
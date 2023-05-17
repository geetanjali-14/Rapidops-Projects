module.exports = function makeInsertEmailUseCase({  }) {
    return async function insertEmail({
        insertEmails,
    }) {
      try {
        console.info("insert Emails use case");
  
        
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };
  
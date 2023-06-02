module.exports = function makeEmailFolderIdUseCase({ Joi, junctionDb }) {
  return async function createInsertEmailFolderIdUsecase({
    folder_id,
    email_id,
    database_name,
  }) {
    console.info(`Inside insert email folder ID's use case`, {
      folder_id,
      email_id,
      database_name,
    });
    try {
      await junctionDb.insert_ids({
        folder_id,
        email_id,
        database_name,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};

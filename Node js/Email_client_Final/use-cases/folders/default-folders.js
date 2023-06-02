module.exports = function makeDefaultFolderUseCase({
  Joi,
  foldersDb,
  // insert_email_folder_id,
}){
  return async function defaultFoldersUseCase({user_id,database_name}) {
      console.info(`Inside default folder user use case`);
      validateInput({user_id});
      try{
        const result =await foldersDb.defaultFolders({user_id,database_name});
        return result;
      }
      catch (err) {
          console.error(err);
          throw err;
        }
  }
  function validateInput({user_id}) {
    const schema = Joi.number().integer().positive();

    const { error, value } = schema.validate(user_id);
    if (error) {
      throw new Error(`Invalid id: ${error.message}`);
    }
    console.log(`The id value is: ${value}`);
    }
}
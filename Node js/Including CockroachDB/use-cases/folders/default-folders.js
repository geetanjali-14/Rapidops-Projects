module.exports = function makeDefaultFolderUseCase({
  Joi,
  foldersDb,
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

    const { error, value } = schema.validate(id);
    if (error) {
      throw new Error(`Invalid id: ${error.message}`);
    }
    console.log(`The id value is: ${value}`);
    }
}
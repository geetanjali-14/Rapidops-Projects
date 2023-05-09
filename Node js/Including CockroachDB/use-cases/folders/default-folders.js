module.exports = function makeDefaultFolderUseCase({
  Joi,
  foldersDb,
}){
  return async function defaultFoldersUseCase({id,database_name}) {
      console.info(`Inside default folder user use case`);
      // validateInput({id});
      try{
        const result =await foldersDb.defaultFolders({id,database_name});
        return result;
      }
      catch (err) {
          console.error(err);
          throw err;
        }
  }
  // function validateInput({id}) {
  //   const schema = Joi.number().integer().positive();

  //   const { error, value } = schema.validate(id);
  //   if (error) {
  //     throw new Error(`Invalid id: ${error.message}`);
  //   }
  //   console.log(`The id value is: ${value}`);
  //   }
}
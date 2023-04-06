module.exports = function makeDefaultFolderUseCase({
    Joi,
    foldersDb,
}){
    return async function defaultFoldersUseCase({id,database_name}) {
        console.info(`Inside default folder user use case`);
        validateInput({id});
        try{
          await foldersDb.defaultFolders({id,database_name});
        }
        catch (err) {
            console.error(err);
            throw err;
          }
    }
    function validateInput({id}) {
        const schema = Joi.object({
            id: Joi.number().required().messages({
                'number.base':'"id" must be a number',
              }),
        });
        const {error} = schema.validate({id});
        if (error) {
          console.error(error)
          throw new Error(`${error.details[0].message}`);
        }
      }
}
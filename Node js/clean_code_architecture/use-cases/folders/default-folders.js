module.exports = function makeDefaultFolderUseCase({
    Joi,
    foldersDb,
}){
    return async function defaultFoldersUseCase({id}) {
        console.info(`Inside default folder user use case`);
        validateInput({id});
        try{
            const result = await foldersDb.defaultFolders({id});
            return result;
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
module.exports = function makeDeleteFolderUseCase({
    Joi,
    foldersDb,
}){
    return async function deleteFolderUsecase({folder_id}) {
        console.info(`Inside delete folder use case`);
        validateInput({folder_id});
        try
        {
            const deletedFolderDetails=await foldersDb.deleteFolder({folder_id});
            return deletedFolderDetails;
        }
        catch (err) {
            console.error(err);
            throw err;
          }
    }
    function validateInput({folder_id}) {
        const schema = Joi.object({
            folder_id: Joi.number().required().messages({
                'number.base':'"folder_id" must be a number',
              }),
        });
        const {error} = schema.validate({folder_id});
        if (error) {
          console.error(error)
          throw new Error(`${error.details[0].message}`);
        }
      }
}
module.exports = function makeCreateFolderUseCase({
    Joi,
    foldersDb,
}){
    return async function updateFolderUsecase({folder_id,name}) {
        console.info(`Inside update folder use case`);
        validateInput({ folder_id, name });
        try{
            const updateResult=await foldersDb.updateFolder({folder_id,name});
            return updateResult;
        }
        catch (err) {
            console.error(err);
            throw err;
          }   
    }
    function validateInput({ folder_id, name }) {
        const schema = Joi.object({
          folder_id: Joi.number().required().messages({
            'number.base':'"folder_id" must be a number',
          }),
          name: Joi.string().required(),
        });
    
        const { error } = schema.validate({ folder_id,name });
        if (error) {
          console.error(error);
          throw new Error(`${error.details[0].message}`);
        }
      }
}
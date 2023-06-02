
module.exports = function makeFolderExistByFilderIdUseCase({ 
  Joi,
  foldersDb
 }) {
    return async function folderExistByFolderIdUsecase({ folder_id,database_name}) {
      console.log(folder_id);
      validateInput({folder_id});
      try {
        const result = await foldersDb.folderExistsByFolderId({ folder_id ,database_name});
        return result;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
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
  };
  
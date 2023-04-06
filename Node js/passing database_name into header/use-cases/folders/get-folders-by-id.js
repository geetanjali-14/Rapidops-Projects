module.exports = function makeGetFolderByIdController({
    Joi,
    foldersDb,
}){
    return async function getFolderByIdController({id,database_name}) {
        console.info(`Inside get folder by id use case`);
        validateInput({id});
        try{
            const folderDetails=await foldersDb.getFolderById({id,database_name});
            return folderDetails;
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
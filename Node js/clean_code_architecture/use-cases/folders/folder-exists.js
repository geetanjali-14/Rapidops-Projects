module.exports = function makeFolderExistUseCase({ 
  Joi,
  foldersDb
 }) {
  return async function createFolderExistUsecase({ user_id, name }) {
    console.log(user_id);
    validateInput({user_id,name});
    try {
      const result = await foldersDb.folderExists({ user_id, name });
      return result;
    } 
    catch (e) {
      console.error(e);
      throw e;
    }
  };
  function validateInput({user_id,name}) {
    const schema = Joi.object({
      user_id: Joi.number().required().messages({
        'number.base':'"user_id" must be a number',
      }),
      name:Joi.string().required().messages({
        'string.base':'"name" is required',
      }),
    });

    const {error} = schema.validate({user_id,name});
    if (error) {
      console.error(error)
      throw new Error(`${error.details[0].message}`);
    }
  }
};

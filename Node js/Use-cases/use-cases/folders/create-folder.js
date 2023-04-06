module.exports = function makeCreateFolderUseCase({ 
  Joi,
  foldersDb }) {
  return async function createFolderUsecase({ user_id, name }) {
    console.info(`Inside create folder use case`);
    validateInput({user_id,name})
    try {
      const newFolderDetails=await foldersDb.createFolder({ user_id,
         name
        });
        return newFolderDetails;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInput({user_id,name}) {
    const schema = Joi.object({
      user_id: Joi.number().required().messages({
        'number.base':'"user_id" must be a number',
      }),
      name: Joi.string().required(),
    });

    const {error} = schema.validate({user_id,name});
    if (error) {
      console.error(error)
      throw new Error(`${error.details[0].message}`);
    }
  }
};

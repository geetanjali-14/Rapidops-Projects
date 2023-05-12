module.exports = function makeCreateFolderUseCase({ Joi, foldersDb }) {
  return async function createFolderUsecase({
    user_id,
    folderName,
    database_name,
  }) {
    console.info(`Inside create folder use case`,{ user_id, folderName ,database_name});
    // validateInput({ user_id, folderName });
    try {

      const newFolderDetails = await foldersDb.createFolder({
        user_id,
        folderName,
        database_name,
      });
      return newFolderDetails;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  // function validateInput({ user_id, folderName }) {
  //   const schema = Joi.object({
  //     user_id: Joi.number().required().messages({
  //       "number.base": '"user_id" must be a number',
  //     }),
  //     folderName: Joi.string().required(),
  //     folderproviderid: Joi.number().integer().allow(null),
  //   });

  //   const { error } = schema.validate({ user_id, folderName });
  //   if (error) {
  //     console.error(error);
  //     throw new Error(`${error.details[0].message}`);
  //   }
  // }
};

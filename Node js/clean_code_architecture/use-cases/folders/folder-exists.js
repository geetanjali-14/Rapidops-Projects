module.exports = function makeFolderExistUseCase({ foldersDb }) {
  return async function createFolderUsecase({ user_id, name }) {
    console.log(user_id);
    try {
      const result = await foldersDb.folderExists({ user_id, name });
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

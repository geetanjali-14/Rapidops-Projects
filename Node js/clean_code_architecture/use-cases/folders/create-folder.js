module.exports = function makeCreateFolderUseCase({ foldersDb }) {
  return async function createFolderUsecase({ id, name }) {
    console.info(`Inside create folder use case`);
    try {
      await foldersDb.createFolder({ id, name });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

module.exports = function makeCreateFolderUseCase({
    foldersDb,
}){
    return async function updateFolderUsecase({folder_id,name}) {
        console.info(`Inside update folder use case`);
            await foldersDb.updateFolder({folder_id,name});
    }
}
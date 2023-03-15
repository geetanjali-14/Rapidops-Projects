module.exports = function makeDeleteFolderUseCase({
    foldersDb,
}){
    return async function deleteFolderUsecase({id}) {
        console.info(`Inside delete folder use case`);
        await foldersDb.deleteFolder({id});
    }
}
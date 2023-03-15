module.exports = function makeGetFolderByIdController({
    foldersDb,
}){
    return async function getFolderByIdController({id}) {
        console.info(`Inside get folder by id use case`);
        await foldersDb.getFolderById({id});
    }
}
module.exports = function makeDefaultFolderUseCase({
    usersDb
}){
    return async function defaultFoldersUseCase({id}) {
        console.info(`Inside default folder user use case`);
        const result = await usersDb.defaultFolders({id});
        return result;
    }
}
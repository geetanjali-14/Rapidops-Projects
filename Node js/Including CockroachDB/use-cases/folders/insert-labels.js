module.exports = function makeinsertLabelsUseCase({
    foldersDb,
}){
    return async function insertLabelsUseCase({ folderNames,user_id,database_name }) {
        try{
            console.info("insert Labels use case")
            for (let i = 0; i < folderNames.length; i++) {
            const folderName = folderNames[i];
            console.log(folderName);
            const folder_exists = await foldersDb.folderExists({ id:user_id, name:folderName ,database_name});
        // console.log("folder_exists",folder_exists)
        if (folder_exists!=0) {
            console.log("Folder exists already:",folderName)
          }
        else
            {
                await foldersDb.createFolder({ user_id, folderName ,database_name})
                console.log("Folder Inserted",folderName)
            }
        }
    }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    };
};
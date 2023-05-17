module.exports = function makeinsertLabelsUseCase({ foldersDb }) {
  return async function insertLabelsUseCase({
    folderNames,
    user_id,
    database_name,
    providerIds,
  }) {
    try {
      console.info("insert Labels use case");

      for (let i = 0, priority = 10; i < folderNames.length; i++, priority++) {
        const folderName = folderNames[i];
        const providerId = providerIds[i];
        {
          if (folderName == "INBOX") priority = 1;
          else if (folderName == "IMPORTANT") priority = 2;
          else if (folderName == "TRASH") priority = 5;
          else if (folderName == "CHAT") priority = 9;
          else if (folderName == "DRAFT") priority = 7;
          else priority = priority;
        }
        // console.log(folderName);
        const folder_exists = await foldersDb.folderExists({
          id: user_id,
          name: folderName,
          database_name,
        });
        // console.log("folder_exists",folder_exists)
        if (folder_exists != 0) {
          // console.log("Folder exists already:", folderName);
          await foldersDb.updateProviderId({
            folderName,
            user_id,
            database_name,
            providerId,
            priority,
          });
        } else {
          await foldersDb.createFolder({
            user_id,
            folderName,
            database_name,
            providerId,
            priority,
          });
          // console.log("Folder Inserted", folderName);
        }
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};

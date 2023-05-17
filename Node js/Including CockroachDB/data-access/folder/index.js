// console.info("folder data index index.js")

const folder_table = "folder";
function makeFolderDbMethods({ connection }) {
  return Object.freeze({
    updateFolder,
    deleteFolder,
    getFolderById,
    createFolder,
    folderExists,
    defaultFolders,
    folderExistsByFolderId,
    updateProviderId,
    fetchLabelsByPriority
  });

  async function defaultFolders({ user_id, database_name }) {
    console.log("Inside default folder data-access", user_id);
    const folders = ["INBOX", "OUTBOX", "TRASH", "ARCHIEVE", "SENT"];
    try {
      for (let i in folders) {
        if (folders[i] == "INBOX") priority = 1;
        else if (folders[i] == "OUTBOX") priority =4;
        else if (folders[i] == "TRASH") priority = 5;
        else if (folders[i] == "ARCHIEVE") priority = 6;
        else if (folders[i] == "SENT") priority = 3;

        await connection.query(
          `insert into ${database_name}.${folder_table} (user_id,name,folders_priority) values ($1,$2,$3)`,
          [user_id, folders[i], priority]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateProviderId({
    folderName,
    user_id,
    database_name,
    providerId,
  }) {
    console.log("Inside update ProviderId data-access of", user_id);
    try {
      await connection.query(
        `update ${database_name}.${folder_table} set folder_provider_id=$3 where user_id=$1 and name=$2`,
        [user_id, folderName, providerId]
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchLabelsByPriority({user_id,database_name }) {
    console.info("Inside fetch Labels By Priority data-access");
    {
      const result = await connection.query(
        `select name, folders_priority from ${database_name}.${folder_table};`,
      );
      // console.info("fetchLabelsByPriority result:",result);
      return result;
    }
  }
  async function folderExists({ id, name, database_name }) {
    console.info("Folder existence check");
    {
      // console.info(user_id,name);
      const result = await connection.query(
        `select count (*) as row from ${database_name}.${folder_table} where user_id=$1 and name=$2`,
        [id, name]
      );
      // console.info(result.rows[0].row);
      return result.rows[0].row;
    }
  }
  async function folderExistsByFolderId({ folder_id, database_name }) {
    console.info("Folder existence check by Folder_ID");
    {
      console.info(folder_id);
      return await connection.query(
        `select count (*) as row from ${database_name}.${folder_table} where folder_id=$1`,
        [folder_id]
      );
      // console.info(result[0].rows);
      // return true;
    }
  }
  async function createFolder({
    user_id,
    folderName,
    database_name,
    providerId,
    priority,
  }) {
    // console.info("Create folder data access", {
    //   user_id,
    //   folderName,
    //   database_name,
    //   priority,
    // });
    {
      const result = await connection.query(
        `INSERT INTO ${database_name}.${folder_table} (user_id,name,folder_provider_id,folders_priority) VALUES ($1,$2,$3,$4)`,
        [user_id, folderName, providerId, priority]
      );
      console.info("Folder Created");
      return result.affectedRows;
    }
  }
  async function getFolderById({ id, database_name }) {
    {
      const [result] = await connection.query(
        `select * from ${database_name}.${folder_table} where user_id=$1 ;`,
        [id]
      );
      console.info(result);
      return result;
    }
  }

  async function updateFolder({ folder_id, name, database_name }) {
    console.info("update folder");
    {
      const [result] = await connection.query(
        `update ${database_name}.${folder_table} set name = $1 where folder_id=$2`,
        [name, folder_id]
      );
      console.info("Folder updated");
      return result[0].folder_id;
    }
  }
  async function deleteFolder({ folder_id, database_name }) {
    console.info("delete folder");
    {
      const [result] = await connection.query(
        `DELETE FROM ${database_name}.${folder_table} WHERE folder_id = $1;`,
        [folder_id]
      );
      console.info(result.affectedRows);
      return result.affectedRows;
    }
  }
}
module.exports = makeFolderDbMethods;

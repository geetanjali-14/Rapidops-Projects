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
    // insertLabels,
  });

  async function defaultFolders({ user_id,database_name }) {
    console.log("Inside default folder data-access",user_id);
    const folders = ["INBOX", "OUTBOX", "TRASH", "ARCHIEVE", "TRASH"];
    try {
      for (let i in folders) {
        await connection.query(`insert into ${database_name}.${folder_table} (user_id,name) values ($1,$2)`, [
          user_id,
          folders[i]]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
  // async function insertLabels({ folderName,user_id,database_name }) {
  //   // console.log("Inside insert Labels data-access of",user_id);
  //   try {
  //       await connection.query(`insert into ${database_name}.${folder_table} (user_id,name) values ($1,$2)`, [
  //         user_id,
  //         folderName]
  //       );
  //     }
  //     catch (err) {
  //     console.log(err);
  //   }
  // }

  async function folderExists({ id, name,database_name }) {
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
  async function folderExistsByFolderId({ folder_id,database_name }) {
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
  async function createFolder({ user_id, folderName ,database_name}) {
    console.info("Create folder data access",{ user_id, folderName ,database_name});
    {
      const result = await connection.query(
        `INSERT INTO ${database_name}.${folder_table} (user_id,name,folder_provider_id) VALUES ($1,$2,$3);`,
        [user_id,folderName,folderName]
      );
      console.info("Folder Created");
      return result.affectedRows;
    }
  }
  async function getFolderById({ id ,database_name}) {
    {
      const [result] = await connection.query(
        `select * from ${database_name}.${folder_table} where user_id=$1 ;`,
        [id]
      );
      console.info(result);
      return result;
    }
  }

  async function updateFolder({ folder_id, name ,database_name}) {
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
  async function deleteFolder({ folder_id ,database_name}) {
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

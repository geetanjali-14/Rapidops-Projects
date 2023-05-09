// console.info("folder data index index.js")

const folder_table = "Folder";
function makeFolderDbMethods({ connection }) {
  return Object.freeze({
    updateFolder,
    deleteFolder,
    getFolderById,
    createFolder,
    folderExists,
    defaultFolders,
    folderExistsByFolderId,
  });

  async function defaultFolders({ id,database_name }) {
    console.log("Inside default folder data-access");
    const folders = ["inbox", "outbox", "trash", "archieve", "trash"];
    try {
      for (let i in folders) {
        await connection.query(`insert into ${database_name}.${folder_table} (user_id,name) values ($1,$2)`, [
          id,
          folders[i],]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }


  async function folderExists({ id, name,database_name }) {
    console.info("Folder existence check");
    {
      // console.info(user_id,name);
      const [result] = await connection.query(
        `select count (*) as row from ${database_name}.${folder_table} where folder_id=$1 and name=$1`,
        [id, name]
      );
      console.info(result[0].row);
      return result[0].row;
    }
  }
  async function folderExistsByFolderId({ folder_id,database_name }) {
    console.info("Folder existence check by Folder_ID");
    {
      console.info(folder_id);
      const [result] = await connection.query(
        `select count (*) as row from ${database_name}.${folder_table} where folder_id=$1`,
        [folder_id]
      );
      console.info(result[0].row);
      return result[0].row;
    }
  }
  async function createFolder({ user_id, name ,database_name}) {
    console.info("Create folder data access");
    {
      const [result] = await connection.query(
        `INSERT INTO ${database_name}.${folder_table} (name,user_id) VALUES ($1,$2);`,
        [name, user_id]
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

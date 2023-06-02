// console.log("folder data index index.js")

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
  });

  async function defaultFolders({ id }) {
    console.log("Inside default folder data-access");
    const folders = ["inbox", "outbox", "trash", "archieve", "trash"];
    try {
      for (let i in folders) {
        await connection.query(`insert into folder (user_id,name) values (?,?)`, [
          id,
          folders[i],]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function folderExists({ id, name }) {
    console.log("Folder existence check");
    {
      // console.log(user_id,name);
      const [result] = await connection.query(
        `select count (*) as row from ${folder_table} where folder_id=? and name=?`,
        [id, name]
      );
      console.log(result[0].row);
      return result[0].row;
    }
  }
  async function folderExistsByFolderId({ folder_id }) {
    console.log("Folder existence check by Folder_ID");
    {
      console.log(folder_id);
      const [result] = await connection.query(
        `select count (*) as row from ${folder_table} where folder_id=?`,
        [folder_id]
      );
      console.log(result[0].row);
      return result[0].row;
    }
  }
  async function createFolder({ user_id, name }) {
    console.log("Create folder data access");
    {
      const [result] = await connection.query(
        `INSERT INTO ${folder_table} (name,user_id) VALUES (?,?);`,
        [name, user_id]
      );
      console.log("Folder Created");
      return result.affectedRows;
    }
  }
  async function getFolderById({ id }) {
    {
      const [result] = await connection.query(
        `select * from ${folder_table} where user_id=? ;`,
        [id]
      );
      console.log(result);
      return result;
    }
  }

  async function updateFolder({ folder_id, name }) {
    console.log("update folder");
    {
      const [result] = await connection.query(
        `update ${folder_table} set name = ? where folder_id=?`,
        [name, folder_id]
      );
      console.log("Folder updated");
      return result[0].folder_id;
    }
  }
  async function deleteFolder({ folder_id }) {
    console.log("delete folder");
    {
      const [result] = await connection.query(
        `DELETE FROM ${folder_table} WHERE folder_id = ?;`,
        [folder_id]
      );
      console.log(result.affectedRows);
      return result.affectedRows;
    }
  }
}
module.exports = makeFolderDbMethods;

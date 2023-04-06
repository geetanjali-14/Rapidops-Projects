// console.info("user use case index.js")
const users_table = "Users";
function makeUserDbMethods({ connection }) {
  return Object.freeze({
    userExists,
    createUser,
    showUser,
    deleteUser,
    getUserById,
    updateUser,
    findId,
  });
  async function userExists({ id ,database_name}) {
    console.info("User's existence check");
    {
      const [result] = await connection.query(
        `select count (*) as row from ${database_name}.${users_table} where user_id=?`,
        [id]
      );
      console.info(result[0].row);
      return result[0].row;
    }
  }

  async function createUser({ name, email, password ,database_name}) {
    console.info("Create user");
    {
      const [result]=await connection.query(
        `INSERT INTO ${database_name}.${users_table} (name,email,password) VALUES (?,?,?);`,
        [name, email, password]
      );
      console.info(result);
      return result;
      
    }
  }
  async function showUser(database_name) {
    console.info("Show user");
    {
      const [result] = await connection.query(`select * from ${database_name}.${users_table};`);
      console.info(result);
      return result.affectedRows;
    }
  }
  async function deleteUser({ id ,database_name}) {
    console.info("delete user");
    {
      const [result] = await connection.query(
        `DELETE FROM ${database_name}.${users_table} WHERE user_id = ?;`,
        [id]
      );
      return result.affectedRows;
    }
  }
  async function updateUser({ id, name ,database_name}) {
    console.info("update user");
    console.info(id, name);
    {
      const [result] = await connection.query(
        `update ${database_name}.${users_table} set name = ? where user_id=?`,
        [name, id]
      );
      console.info("User updated");
      return result[0];
    }
  }
  async function getUserById({ id,database_name}) {
    {
      const [result] = await connection.query(
        `select * from ${database_name}.${users_table} where user_id=?;`,
        [id]
      );
      console.info(result);
      return result;
    }
  }

  async function findId({ email,database_name}) {
    console.info("FindIdDb in data-access");
    console.info({ email });
    {
      const [result] = await connection.query(
        `select user_id from ${database_name}.${users_table} where email=?`,
        [email]
      );
      return result[0].user_id;
    }
  }
}
module.exports = makeUserDbMethods;

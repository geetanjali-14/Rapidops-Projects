// console.log("user use case index.js")
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
  async function userExists({ id }) {
    console.log("User's existence check");
    {
      const [result] = await connection.query(
        `select count (*) as row from ${users_table} where user_id=?`,
        [id]
      );
      console.log(result[0].row);
      return result[0].row;
    }
  }

  async function createUser({ name, email, password }) {
    console.log("Create user");
    {
      const [result]=await connection.query(
        `INSERT INTO ${users_table} (name,email,password) VALUES (?,?,?);`,
        [name, email, password]
      );
      console.log(result);
      return result;
      
    }
  }
  async function showUser({}) {
    console.log("Show user");
    {
      const [result] = await connection.query(`select * from ${users_table};`);
      console.log(result);
      return result.affectedRows;
    }
  }
  async function deleteUser({ id }) {
    console.log("delete user");
    {
      const [result] = await connection.query(
        `DELETE FROM ${users_table} WHERE user_id = ?;`,
        [id]
      );
      return result.affectedRows;
    }
  }
  async function updateUser({ id, name }) {
    console.log("update user");
    console.log(id, name);
    {
      const [result] = await connection.query(
        `update ${users_table} set name = ? where user_id=?`,
        [name, id]
      );
      console.log("User updated");
      return result[0].user_id;
    }
  }
  async function getUserById({ id }) {
    {
      const [result] = await connection.query(
        `select * from ${users_table} where user_id=?;`,
        [id]
      );
      console.log(result);
      return result;
    }
  }

  async function findId({ email }) {
    console.log("FindIdDb in data-access");
    console.log({ email });
    {
      const [result] = await connection.query(
        `select user_id from ${users_table} where email=?`,
        [email]
      );
      return result[0].user_id;
    }
  }
}
module.exports = makeUserDbMethods;

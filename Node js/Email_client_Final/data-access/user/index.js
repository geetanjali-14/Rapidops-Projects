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
    getAllDbRelatedUser,
    updateUserAccesToken
  });
  async function userExists({ id ,database_name}) {
    console.info("User's existence check");
    {
      const [result] = await connection.query(
        `select count (*) as row from ${database_name}.${users_table} where user_id=$1`,
        [id]
      );
      console.log(result[0].row);
      return result[0].row;
    }
  }

  async function createUser({ name, email, password ,access_token,refresh_token,expiry_date,database_name}) {
    console.log("Create user");
    {
      const result=await connection.query(
        `INSERT INTO ${database_name}.${users_table} (name,email,password,access_token,refresh_token,expiry_date) VALUES ($1,$2,$3,$4,$5,$6);`,
        [name, email, password,access_token,refresh_token,expiry_date]
      );
      console.log("User Inserted.")
      return result;
    }
  }
  async function showUser(database_name) {
    console.log("Show user");
    {
      const [result] = await connection.query(`select * from ${database_name}.${users_table};`);
      console.log(result);
      return result.affectedRows;
    }
  }
  async function deleteUser({ id,database_name }) {
    console.log("delete user");
    {
      const [result] = await connection.query(
        `DELETE FROM ${database_name}.${users_table} WHERE user_id = $1;`,
        [id]
      );
      return result.affectedRows;
    }
  }
  async function updateUser({ id, name,database_name }) {
    console.log("update user");
    console.log(id, name);
    {
      const [result] = await connection.query(
        `update ${database_name}.${users_table} set name = $1 where user_id=$2`,
        [name, id]
      );
      console.log("User updated");
      return result[0].user_id;
    }
  }
  async function getUserById({ id,database_name }) {
    {
      const result = await connection.query(
        `select * from ${database_name}.${users_table} where user_id=$1;`,
        [id]
      );
      console.log(result);
      return result;
    }
  }

  async function findId({ email,database_name }) {
    console.log("FindIdDb in data-access");
    console.log({ email });
    {
      const result = await connection.query(
        `select user_id from ${database_name}.${users_table} where email=$1`,
        [email]
      );
      console.log(result.rows[0].user_id);
      return result.rows[0].user_id;
    }
  }
  async function getAllDbRelatedUser({current_time,database_name})
    {
        const result=await connection.query( `select * from ${database_name}.users where expiry_date-${current_time}>=60000;`); 
        return result.rows;
    }

    
    async function updateUserAccesToken({ user_id,access_token,expiry_date,database_name })
    {
        console.log("At updateDbUserAccesToken::", user_id,access_token,expiry_date,database_name );
        const result = await connection.query( `update ${database_name}.users set(access_token,expiry_date) = ($1,$2) where user_id=$3`,[access_token,expiry_date,user_id]) ;
        // console.log("RESULT: ",result);
        return result;
    }
}
module.exports = makeUserDbMethods;
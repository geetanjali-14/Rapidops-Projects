const table_name = "authentication_tokens";

function makeAccessTokenDbMethods({ connection }) {
  return Object.freeze({
    insertAccessToken,
    accessTokenExists,
    updateAccessToken,
    fetchExpirationTime,
  });

  async function insertAccessToken({
    employee_id,
    access_token,
    expiration_time,
    created_at,
    database_name,
  }) {
    console.log("insert AccessToken data-access");
    const result = await connection.query(
      `INSERT INTO ${database_name}.${table_name} (employee_id, token, expires_at, createdAt) VALUES (?, ?, ?, ?);`,
      [employee_id, access_token, expiration_time, created_at]
    );
    console.log("Access token inserted.");
  }  

  async function accessTokenExists({
    access_token,
    database_name,
  }) {
    console.log(" AccessToken exists data-access",database_name);
    const result = await connection.query(
      `SELECT COUNT(*) AS row FROM ${database_name}.${table_name} WHERE token = ?`,[access_token]
    );
    console.log("Access token exists.");
    const access_token_exists=result[0][0].row;
    return access_token_exists;
  } 

  async function fetchExpirationTime({
    access_token,
    database_name,
  }) {
    console.log(" expiration Time data-access");
    const result = await connection.query(
      `SELECT expires_at FROM ${database_name}.${table_name} WHERE token = ?`,[access_token]
    );
    console.log("Access token ExpirationTime.");
    const expiration_time=result[0][0].expires_at;
    return expiration_time;
  } 
  
  async function updateAccessToken({
    access_token,
    updated_expiration_time,
    database_name,
  }) {
    console.log("update AccessToken data-access");
    await connection.query(
      `UPDATE ${database_name}.${table_name} SET expires_at=? WHERE token=?`,
      [updated_expiration_time, access_token]
    );
    console.log("Access token updated.");
  }
  
}

module.exports = makeAccessTokenDbMethods;

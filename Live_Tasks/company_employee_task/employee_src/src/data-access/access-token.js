const tableName = "authentication_tokens";
const databaseName = "employee";

function makeAccessTokenDbMethods({ connection, DatabaseError }) {
  return Object.freeze({
    insertAccessToken,
    accessTokenExists,
    updateAccessToken,
    fetchExpirationTime,
    filterEmployees,
    getEmployeeIdFromAccessToken,
    accessTokenExistsByEployeeId,
  });

  async function insertAccessToken({
    employeeId,
    accessToken,
    expirationTime,
    createdAt,
    ipAddress,
    city,
    state,
    country,
    deviceName,
    browserName,
  }) {
    try {
      console.log("insert AccessToken data-access");
      const result = await connection.query(
        `INSERT INTO ${databaseName}.${tableName} (employeeid, token, expiresat, createdat, ipaddress, city, state, country, device, browser) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
        [
          employeeId,
          accessToken,
          expirationTime,
          createdAt,
          ipAddress,
          city,
          state,
          country,
          deviceName,
          browserName,
        ]
      );
      console.log("Access token inserted.");
    } catch (error) {
      throw new DatabaseError("Failed to insert access token");
    }
  }

  async function accessTokenExists({ accessToken }) {
    try {
      console.log("AccessToken exists data-access", accessToken);
      const result = await connection.query(
        `SELECT COUNT(*) AS row FROM ${databaseName}.${tableName} WHERE token = $1;`,
        [accessToken]
      );
      const accessTokenExistsResult = result.rows[0].row;
      console.log("Access token exists.", accessTokenExistsResult);
      return accessTokenExistsResult;
    } catch (error) {
      throw new DatabaseError("Failed to check access token existence");
    }
  }

  async function accessTokenExistsByEployeeId({ employeeId }) {
    try {
      const result = await connection.query(
        `SELECT token AS accessToken FROM ${databaseName}.${tableName} WHERE employeeid = $1;`,
        [employeeId]
      );
      const accessToken = result.rows[0];
      if (!accessToken) {
        throw new Error(`No access token found for employee ID ${employeeId}`);
      }
      return accessToken;
    } catch (error) {
      throw new DatabaseError("Failed to check access token existence by employee ID");
    }
  }

  async function fetchExpirationTime({ accessToken }) {
    try {
      console.log("expiration Time data-access");
      const result = await connection.query(
        `SELECT expiresat FROM ${databaseName}.${tableName} WHERE token = $1;`,
        [accessToken]
      );
      console.log("Access token ExpirationTime.");
      const expirationTime = result.rows[0].expiresat;
      if (!expirationTime) {
        throw new Error(`No expiration time found for access token ${accessToken}`);
      }
      return expirationTime;
    } catch (error) {
      throw new DatabaseError("Failed to fetch access token expiration time");
    }
  }

  async function getEmployeeIdFromAccessToken({ accessToken }) {
    try {
      console.log("getEmployeeIdFromAccessToken data-access");
      const result = await connection.query(
        `SELECT employeeid FROM ${databaseName}.${tableName} WHERE token = $1;`,
        [accessToken]
      );
      console.log("Access token ExpirationTime.");
      const employeeId = result.rows[0].employeeid;
      if (!employeeId) {
        throw new Error(`No employee ID found for access token ${accessToken}`);
      }
      return employeeId;
    } catch (error) {
      throw new DatabaseError("Failed to get employee ID from access token");
    }
  }

  async function updateAccessToken({ accessToken, updatedExpirationTime }) {
    try {
      console.log("update AccessToken data-access");
      const result = await connection.query(
        `UPDATE ${databaseName}.${tableName} SET expiresat=$1 WHERE token=$2;`,
        [updatedExpirationTime, accessToken]
      );
      if (result.rowCount === 0) {
        throw new Error(`No access token found for update: ${accessToken}`);
      }
      console.log("Access token updated.");
    } catch (error) {
      throw new DatabaseError("Failed to update access token");
    }
  }

  async function filterEmployees({ filters }) {
    const { city, device, browser } = filters;
    let query = `SELECT * FROM ${databaseName}.${tableName} WHERE true`;
    if (city) {
      query += ` AND city = $1`;
    }
    if (device) {
      query += ` AND device = $2`;
    }
    if (browser) {
      query += ` AND browser = $3`;
    }
    try {
      const params = [];
      if (city) {
        params.push(city);
      }
      if (device) {
        params.push(device);
      }
      if (browser) {
        params.push(browser);
      }
      const result = await connection.query(query, params);
      if (result.rows.length === 0) {
        throw new Error("No employees found with the given filters");
      }
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to filter employees");
    }
  }
}

module.exports = makeAccessTokenDbMethods;

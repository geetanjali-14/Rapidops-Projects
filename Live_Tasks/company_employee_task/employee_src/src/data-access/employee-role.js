const tableName = "employee_roles_association";
const databaseName = "employee";

function employeeRolesDB({ connection, DatabaseError }) {
  return Object.freeze({
    assignEmployeeRoles,
    fetchEmployeeRole,
  });

  async function assignEmployeeRoles({ employeeId, roleIds }) {
    try {
      const roleIdJSON = JSON.stringify(roleIds);
      const result = await connection.query(
        `INSERT INTO ${databaseName}.${tableName} (employeeid, roleid) VALUES ($1, $2);`,
        [employeeId, roleIdJSON]
      );

      return result;
    } catch (error) {
      throw new DatabaseError("Failed to assign employee roles");
    }
  }

  async function fetchEmployeeRole({ employeeId }) {
    try {
      console.info("Fetch employee role Data-access");
      const { rows } = await connection.query(
        `SELECT roleid FROM ${databaseName}.${tableName} WHERE employeeid = $1;`,
        [employeeId]
      );

      if (rows.length > 0) {
        const roles = JSON.parse(rows[0].roleid);
        return roles;
      } else {
        throw new Error("There are no employee roles.");
      }
    } catch (error) {
      throw new DatabaseError("Failed to fetch employee role");
    }
  }
}

module.exports = employeeRolesDB;

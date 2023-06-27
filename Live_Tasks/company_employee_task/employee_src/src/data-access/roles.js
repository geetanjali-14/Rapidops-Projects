const tableName = "roles";
const databaseName = "employee";

function makeRolesDbMethods({ connection, DatabaseError }) {
  return Object.freeze({
    createRole,
    fetchAllRoles,
    updateRole,
    deleteRole,
    roleExists,
    fetchRoleId,
    fetchRoleNameByRoleId,
    fetchPermissionsByRoleId,
    deleteRolesOfDeletedCompany,
  });

  async function createRole({ name, companyId, permissions, isMaster }) {
    try {
      const permissionsJson = JSON.stringify(permissions);

      const result = await connection.query(
        `INSERT INTO ${databaseName}.${tableName} (role, permissions, companyId, isMaster) VALUES ($1, $2, $3, $4) RETURNING id;`,
        [name, permissionsJson, companyId, isMaster]
      );

      return result.rows[0].id;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to create role");
    }
  }

  async function fetchAllRoles() {
    try {
      console.info("All roles Data-access");
      const result = await connection.query(
        `SELECT role FROM ${databaseName}.${tableName};`
      );

      const roles = result.rows.map((row) => row.role);
      return roles;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to fetch all roles.");
    }
  }

  async function updateRole({ roleId, companyId, permissions }) {
    try {
      const permissionsJson = JSON.stringify(permissions);

      const result = await connection.query(
        `UPDATE ${databaseName}.${tableName} SET permissions = $1, companyId = $2 WHERE id = $3;`,
        [permissionsJson, companyId, roleId]
      );

      return result.rowCount > 0;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to update role.");
    }
  }

  async function deleteRole(roleId) {
    try {
      const result = await connection.query(
        `DELETE FROM ${databaseName}.${tableName} WHERE id = $1;`,
        [roleId]
      );

      return result.rowCount > 0;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to delete role.");
    }
  }

  async function roleExists(role) {
    try {
      console.info("Role existence check by roleId data-access", role);
      const result = await connection.query(
        `SELECT COUNT(*) AS row FROM ${databaseName}.${tableName} WHERE role = $1`,
        [role]
      );

      return result.rows[0].row > 0;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to check role existence.");
    }
  }

  async function fetchRoleId({ role }) {
    try {
      console.info("Fetch role ID data-access", role);
      const result = await connection.query(
        `SELECT id FROM ${databaseName}.${tableName} WHERE role = $1`,
        [role]
      );

      return result.rows[0].id;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to fetch role ID.");
    }
  }

  async function fetchRoleNameByRoleId({ roleId }) {
    try {
      console.info("Fetch role name by roleId data-access", roleId);
      const result = await connection.query(
        `SELECT role FROM ${databaseName}.${tableName} WHERE id = $1`,
        [roleId]
      );

      if (result.rows.length === 0) {
        throw new DatabaseError("Role not found.");
      }

      return result.rows[0].role;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to fetch role name by roleId.");
    }
  }

  async function fetchPermissionsByRoleId({ roleId }) {
    try {
      console.info("Fetch permissions by roleId data-access", roleId);
      const result = await connection.query(
        `SELECT permissions FROM ${databaseName}.${tableName} WHERE id = $1`,
        [roleId]
      );

      if (result.rows.length === 0) {
        throw new DatabaseError("Role not found.");
      }

      return result.rows[0].permissions;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to fetch permissions by roleId.");
    }
  }

  async function deleteRolesOfDeletedCompany({ companyId }) {
    try {
      console.info("Delete roles when company is deleted, data-access");
      const result = await connection.query(
        `DELETE FROM ${databaseName}.${tableName} WHERE companyId = $1;`,
        [companyId]
      );

      return result.rowCount;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to delete roles of deleted company.");
    }
  }
}

module.exports = makeRolesDbMethods;

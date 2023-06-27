const tableName = "employee";
const databaseName = "employee";

function makeEmployeeDbMethods({ connection, DatabaseError }) {
  return Object.freeze({
    createEmployee,
    employeeExists,
    getEmployeesByCompanyName,
    getAllEmployees,
    deleteEmployee,
    updateEmployee,
    deleteEmployeeOfDeletedCompany,
    updateEmployeeWhenCompanyIsUpdated,
    employeeEmailExists,
    updateVerificationStatus,
    isVerifiedEmployee,
    authenticateEmployee,
    getEmployeeIdByEmployeeEmail,
    deleteMultipleEmployees,
    createMaster,
    isMaster,
    assignOtherEmployeeMasterWhenMasterDeletes,
    makeOtherEmployeeMaster,
  });

  async function createEmployee({
    employeeName,
    jobTitle,
    companyId,
    companyName,
    employeeEmail,
    password,
  }) {
    try {
      console.log("Create employee data-access");
      const result = await connection.query(
        `INSERT INTO ${databaseName}.${tableName} (name, jobTitle, companyName, companyId, emailId, password, verified, isMaster) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING employeeId;`,
        [
          employeeName,
          jobTitle,
          companyName,
          companyId,
          employeeEmail,
          password,
          false,
          false,
        ]
      );
      const employeeId = result.rows[0].employeeId;
      return employeeId;
    } catch (error) {
      throw new DatabaseError("Failed to create employee.");
    }
  }

  async function employeeExists({ employeeId }) {
    try {
      console.info("Employee's existence check by employeeId data-access");
      const result = await connection.query(
        `SELECT COUNT(*) AS count FROM ${databaseName}.${tableName} WHERE employeeId = $1`,
        [employeeId]
      );
      const count = result.rows[0].count;
      return count > 0;
    } catch (error) {
      throw new DatabaseError("Failed to check employee existence.");
    }
  }

  async function employeeEmailExists({ employeeEmail }) {
    try {
      console.info("Employee's existence check by employeeEmail data-access");
      const result = await connection.query(
        `SELECT COUNT(*) AS count FROM ${databaseName}.${tableName} WHERE emailId = $1`,
        [employeeEmail]
      );
      const count = result.rows[0].count;
      return count > 0;
    } catch (error) {
      throw new DatabaseError("Failed to check employee email existence.");
    }
  }

  async function getEmployeesByCompanyName({ companyName }) {
    try {
      console.info(`Employees of ${companyName} data-access`);
      const result = await connection.query(
        `SELECT name FROM ${databaseName}.${tableName} WHERE companyName = $1`,
        [companyName]
      );
      const employeeNames = result.rows.map((row) => row.name);
      return employeeNames;
    } catch (error) {
      throw new DatabaseError("Failed to fetch employees by company name.");
    }
  }

  async function getAllEmployees() {
    try {
      console.info("All employees Data-access");
      const [result] = await connection.query(
        `SELECT name FROM ${databaseName}.${tableName};`
      );
  
      if (result.length === 0) {
        throw new DatabaseError("No employees found.");
      }
  
      const employeeNames = result.map((row) => row.name);
      return employeeNames;
    } catch (error) {
      throw new DatabaseError("Failed to fetch all employees.");
    }
  }
  
  
  async function deleteEmployee({ employeeId }) {
    try {
      console.info("Delete employee data-access");
  
      const [result] = await connection.query(
        `DELETE FROM ${databaseName}.${tableName} WHERE employeeId = $1`,
        [employeeId]
      );
      if (result.affectedRows === 0) {
        throw new DatabaseError("No employee found with the provided ID.");
      }
      return result;
    } catch (error) {
      throw new DatabaseError("Failed to delete employee.");
    }
  }
  
  
  async function assignOtherEmployeeMasterWhenMasterDeletes({ employeeId }) {
    try {
      console.info("Assigning master to another employee when master is deleted, data-access");
  
      const [nextEmployee] = await connection.query(
        `SELECT * FROM ${databaseName}.${tableName} WHERE isMaster = false ORDER BY employeeId LIMIT 1`
      );
  
      if (nextEmployee.length > 0) {
        const nextEmployeeId = nextEmployee[0].employeeId;
        await connection.query(
          `UPDATE ${databaseName}.${tableName} SET isMaster = true WHERE employeeId = $1`,
          [nextEmployeeId]
        );
      }
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to assign master to another employee.");
    }
  }
  
  async function deleteMultipleEmployees({ validEmployeeIds }) {
    try {
      console.info("Delete multiple employees data-access");
      console.log(validEmployeeIds);
      const [result] = await connection.query(
        `DELETE FROM ${databaseName}.${tableName} WHERE employeeId IN ($1)`,
        [validEmployeeIds]
      );
      if (result.affectedRows === 0) {
        throw new DatabaseError("No employees were deleted.");
      }
      return result;
    } catch (error) {
      throw new DatabaseError("Failed to delete multiple employees.");
    }
  }
  
  async function deleteEmployeeOfDeletedCompany({ companyId }) {
    try {
      console.info("Delete employees of deleted company data-access");
      const [result] = await connection.query(
        `DELETE FROM ${databaseName}.${tableName} WHERE companyId = $1`,
        [companyId]
      );
  
      if (result.affectedRows === 0) {
        throw new DatabaseError("No employees were deleted.");
      }
      return result.affectedRows;
    } catch (error) {
      throw new DatabaseError("Failed to delete employees of deleted company.");
    }
  }
  async function updateEmployee({
    employeeId,
    employeeName,
    jobTitle,
    companyId,
    companyName,
  }) {
    try {
      console.log("Update employee data-access");
      const [result] = await connection.query(
        `UPDATE ${databaseName}.${tableName} SET name = $1, companyId = $2, companyName = $3, jobTitle = $4 WHERE employeeId = $5`,
        [employeeName, companyId, companyName, jobTitle, employeeId]
      );
  
      if (result.affectedRows === 0) {
        return "No employee was updated.";
      }
      return result.affectedRows;
    } catch (error) {
      throw new DatabaseError("Failed to update employee.");
    }
  }
  
  async function updateEmployeeWhenCompanyIsUpdated({
    companyId,
    companyName,
  }) {
    try {
      console.log("update employee when company table is updated data-access.");
      const [result] = await connection.query(
        `UPDATE ${databaseName}.${tableName} SET companyName = $1 WHERE companyId = $2`,
        [companyName, companyId]
      );
      if (result.affectedRows === 0) {
        throw new DatabaseError("No employee was updated when company table is updated.");
      }
      return result.affectedRows;
    } catch (error) {
      throw new DatabaseError("Failed to update employee when company table is updated.");
    }
  }
  
  async function updateVerificationStatus({ employeeEmail }) {
    try {
      console.log("update verification status data-access.");
      const [result] = await connection.query(
        `UPDATE ${databaseName}.${tableName} SET verified = true WHERE emailId = $1;`,
        [employeeEmail]
      );
  
      if (result.affectedRows === 0) {
        throw new DatabaseError("No employee was found with the specified email for updating verification status.");
      }
      return result.affectedRows;
    } catch (error) {
      throw new DatabaseError("Failed to update verification status.");
    }
  }
  
  async function isVerifiedEmployee({ employeeId }) {
    try {
      console.info("employee's verification check by employeeId data-access");
      const [result] = await connection.query(
        `SELECT verified FROM ${databaseName}.${tableName} WHERE employeeId = $1;`,
        [employeeId]
      );
  
      if (result.length === 0) {
        throw new DatabaseError("No employee was found with the specified ID.");
      }
      const { verified } = result[0];
      return verified;
  
    } catch (error) {
      throw new DatabaseError("Failed to check employee verification status.");
    }
  }
  
  async function authenticateEmployee({ employeeEmail, password }) {
    try {
      console.info("employee's authentication by employeeEmail data-access");
      const [result] = await connection.query(
        `SELECT * FROM ${databaseName}.${tableName} WHERE emailId = $1 AND password = $2;`,
        [employeeEmail, password]
      );
      if (result.length === 0) {
        throw new DatabaseError("Invalid email or password. Authentication failed.");
      }
      return result[0];
    } catch (error) {
      throw new DatabaseError("Failed to authenticate employee.");
    }
  }
  
  async function getEmployeeIdByEmployeeEmail({ employeeEmail }) {
    try {
      console.info(`employee's of ${employeeEmail} data-access`);
      const result = await connection.query(
        `SELECT employeeId FROM ${databaseName}.${tableName} WHERE emailId = $1`,
        [employeeEmail]
      );
      if (result[0].length === 0) {
        throw new Error("Employee ID not found for the provided email.");
      }
      const employeeId = result[0][0].employeeId;
      return employeeId;
    } catch (error) {
      throw new DatabaseError("Failed to fetch employee ID by email.");
    }
  }
  
  async function createMaster({ companyId }) {
    try {
      console.log("Set first employee as master data-access");
      const [result] = await connection.query(
        `UPDATE ${databaseName}.${tableName} SET isMaster = true WHERE companyId = $1 ORDER BY employeeId ASC LIMIT 1`,
        [companyId]
      );
  
      if (result.affectedRows === 0) {
        throw new Error("No employee found for the provided company ID.");
      }
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to set first employee as master.");
    }
  }
  
  async function isMaster({ employeeId }) {
    try {
      console.info("Employee's isMaster check by employeeId data-access");
      const [result] = await connection.query(
        `SELECT COUNT(*) AS row FROM ${databaseName}.${tableName} WHERE employeeId = $1 AND isMaster = 1;`,
        [employeeId]
      );
      console.log(result);
      if (!result || result.length === 0) {
        throw new Error("No result received.");
      }
      const rowCount = result[0].row;
      return rowCount > 0;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to check employee isMaster status.");
    }
  }
  
  async function makeOtherEmployeeMaster({ employeeId }) {
    try {
      console.info("Assign Employee Master role by master itself data-access");
      const result = await connection.query(
        `UPDATE ${databaseName}.${tableName} SET isMaster = true WHERE employeeId = $1`,
        [employeeId]
      );
      if (!result || result.affectedRows === 0) {
        throw new Error("No rows affected.");
      }
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Failed to assign employee Master role.");
    }
  }
  
}

module.exports = makeEmployeeDbMethods;

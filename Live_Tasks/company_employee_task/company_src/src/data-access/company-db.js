const tableName = "company";

function makeCompanyDbMethods({ connection, DatabaseError }) {
  return Object.freeze({
    createCompany,
    companyExists,
    updateCompany,
    deleteCompany,
    findIdByCompanyName,
    companyNameByCompanyId,
    companyExistsByName,
    getAllCompanies,
    companyEmailByCompanyId,
  });

  async function createCompany({ companyName, address, companyEmail }) {
    try {
      const result = await connection.query(
        `INSERT INTO ${tableName} (name, address, email) VALUES ($1, $2, $3) RETURNING id;`,
        [companyName, address, companyEmail]
      );
      if (result.rowCount === 0) {
        throw new Error('Failed to create company.');
      }
      return result.rows[0].id;
    } catch (error) {
      throw new DatabaseError('Failed to create company.');
    }
  }
  
  async function companyExists({ companyId }) {
    try {
      const result = await connection.query(
        `SELECT COUNT(*) AS row FROM ${tableName} WHERE id = $1;`,
        [companyId]
      );
      if (result.rowCount === 0) {
        throw new Error('Failed to check company existence.');
      }
      return result.rows[0].row === 1;
    } catch (error) {
      throw new DatabaseError('Failed to check company existence.');
    }
  }
  
  async function companyExistsByName({ companyName }) {
    try {
      const result = await connection.query(
        `SELECT COUNT(*) AS row FROM ${tableName} WHERE name = $1;`,
        [companyName]
      );
      if (result.rowCount === 0) {
        throw new Error('Failed to check company existence by name.');
      }
      return result.rows[0].row === 1;
    } catch (error) {
      throw new DatabaseError('Failed to check company existence by name.');
    }
  }

  async function updateCompany({ companyId, companyName, address, companyEmail }) {
    try {
      const result = await connection.query(
        `UPDATE ${tableName} SET name = $1, address = $2, email = $3 WHERE id = $4;`,
        [companyName, address, companyEmail, companyId]
      );
      if (result.rowCount === 0) {
        throw new Error(`No company found with ID ${companyId} or the provided values are the same as the existing values.`);
      }
      return result.rowCount;
    } catch (error) {
      throw new DatabaseError('Failed to update company.');
    }
  }
  
  async function deleteCompany({ companyId }) {
    try {
      const result = await connection.query(
        `DELETE FROM ${tableName} WHERE id = $1;`,
        [companyId]
      );
      if (result.rowCount > 0) {
        return companyId;
      } else {
        throw new Error(`No company found with ID ${companyId}`);
      }
    } catch (error) {
      throw new DatabaseError(`Failed to delete company: ${error.message}`);
    }
  }
  
  async function findIdByCompanyName({ companyName }) {
    try {
      const result = await connection.query(
        `SELECT id FROM ${tableName} WHERE name = $1;`,
        [companyName]
      );
      if (result.rowCount === 0) {
        throw new Error(`No company found with name ${companyName}`);
      }
      return result.rows[0].id;
    } catch (error) {
      throw new DatabaseError('Failed to find company ID by name.');
    }
  }
  
  async function companyNameByCompanyId({ companyId }) {
    try {
      const result = await connection.query(
        `SELECT name FROM ${tableName} WHERE id = $1;`,
        [companyId]
      );
      if (result.rowCount === 0) {
        throw new Error(`No company found with ID ${companyId}`);
      }
      return result.rows[0].name;
    } catch (error) {
      throw new DatabaseError('Failed to get company name by ID.');
    }
  }
  
  async function companyEmailByCompanyId({ companyId }) {
    try {
      const result = await connection.query(
        `SELECT email FROM ${tableName} WHERE id = $1;`,
        [companyId]
      );
      if (result.rowCount === 0) {
        throw new Error(`No company found with ID ${companyId}`);
      }
      return result.rows[0].email;
    } catch (error) {
      throw new DatabaseError('Failed to get company email by ID.');
    }
  }
  
  async function getAllCompanies() {
    try {
      const result = await connection.query(
        `SELECT name FROM ${tableName};`
      );
      if (result.rowCount === 0) {
        throw new Error('No companies found.');
      }
      return result.rows;
    } catch (error) {
      throw new DatabaseError('Failed to get all companies.');
    }
  }
}
  
module.exports = makeCompanyDbMethods;

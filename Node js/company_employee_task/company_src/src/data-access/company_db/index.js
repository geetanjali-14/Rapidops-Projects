console.log("company data-access index.js");
const table_name = "company";

function makeCompanyDbMethods({ connection }) {
  return Object.freeze({
    createCompany,
    companyExists,
    updateCompany,
    deleteCompany,
    findIdbyCompanyName,
    companyNameByCompanyId,
    companyExistsByName,
    getAllCompanies,
  });

  async function createCompany({ company_name, address, database_name }) {
    console.log("Create company");
    const result = await connection.query(
      `INSERT INTO ${database_name}.${table_name} (name, address) VALUES (?, ?);`,
      [company_name, address]
    );
    console.log("Company Inserted with ID.", result[0].insertId);
    return result[0].insertId;
  }

  async function companyExists({ company_id, database_name }) {
    console.info("Company's existence check");
    const [result] = await connection.query(
      `SELECT COUNT(*) AS row FROM ${database_name}.${table_name} WHERE company_id = ?`,
      [company_id]
    );
    console.log(result[0].row);
    return result[0].row;
  }

  async function companyExistsByName({ company_name, database_name }) {
    console.info("Company's existence check by Name",company_name);
    const [result] = await connection.query(
      `SELECT COUNT(*) AS row FROM ${database_name}.${table_name} WHERE name = ?`,
      [company_name]
    );
    console.log(result[0].row);
    return result[0].row;
  }

  async function updateCompany({ company_id, company_name,address ,database_name}) {
    console.log("update Company");
    console.log(company_id, company_name);
    const [result] = await connection.query(
      `UPDATE ${database_name}.${table_name} SET name = ?,address=? WHERE company_id = ?`,
      [company_name, address,company_id]
    );
    console.log("Company updated", result);
    return result.affectedRows;
  }

  async function deleteCompany({ company_id, database_name }) {
    console.log("delete company");
    const [result] = await connection.query(
      `DELETE FROM ${database_name}.${table_name} WHERE company_id = ?;`,
      [company_id]
    );
    if (result.affectedRows > 0) {
      return company_id; 
    } else {
      throw new Error(`No company found with ID ${company_id}`);
    }
  }

  async function findIdbyCompanyName({ company_name, database_name }) {
    console.log("findIdbyCompanyName in data-access");
    console.log(company_name);
      const result = await connection.query(`SELECT company_id FROM ${database_name}.${table_name}
      WHERE name = ?`, [company_name]);
      console.log(result[0][0].company_id,"Exiting data-access of find company id by company name");
      return result[0][0].company_id;
  }  
 
  async function companyNameByCompanyId({ company_id, database_name }) {
    console.log("companyName By CompanyID in data-access");
    console.log({company_id});
      const result = await connection.query(`SELECT name FROM ${database_name}.${table_name}
      WHERE company_id = ?`, [company_id]);
      // console.log(result[0][0].name);
      return result[0][0].name;
  }
  
  async function getAllCompanies({database_name }) {
    console.info("All companies Data-access");
    const [result] = await connection.query(
      `SELECT name FROM ${database_name}.${table_name};`
    );
    console.log(result);
    const company_names = result.map((row) => row.name);

    return company_names;
  }
}


module.exports = makeCompanyDbMethods;

const table_name = "employee";

function makeEmployeeDbMethods({ connection }) {
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
  });

  async function createEmployee({
    employee_name,
    role,
    company_id,
    company_name,
    employee_email,
    password,
    database_name,
  }) {
    console.log("Create employee data-access");
    const result = await connection.query(
      `INSERT INTO ${database_name}.${table_name} (name,role,company_name,company_id,email_id,password,verified) VALUES (?,?,?,?,?,?,?);`,
      [
        employee_name,
        role,
        company_name,
        company_id,
        employee_email,
        password,
        false,
      ]
    );
    console.log("Employee Inserted with ID.", result[0].insertId);
    return result[0].insertId;
  }

  async function employeeExists({ employee_id, database_name }) {
    console.info("employee's existence check by employee_id data-access");
    const [result] = await connection.query(
      `SELECT COUNT(*) AS row FROM ${database_name}.${table_name} WHERE employee_id = ?`,
      [employee_id]
    );
    console.log(result[0].row);
    return result[0].row;
  }

  async function employeeEmailExists({ employee_email, database_name }) {
    console.info(
      "employee's existence check by employee_email data-access",
      employee_email
    );
    const [result] = await connection.query(
      `SELECT COUNT(*) AS row FROM ${database_name}.${table_name} WHERE email_id = ?`,
      [employee_email]
    );
    console.log(result[0].row);
    return result[0].row;
  }

  async function getEmployeesByCompanyName({ company_name, database_name }) {
    console.info(`employee's of ${company_name} data-access`);
    const [result] = await connection.query(
      `SELECT name FROM ${database_name}.${table_name} WHERE company_name = ?`,
      [company_name]
    );
    console.log(result);
    const employee_names = result.map((row) => row.name);

    return employee_names;
  }

  async function getAllEmployees({ database_name }) {
    console.info("All employees Data-access");
    const [result] = await connection.query(
      `SELECT name FROM ${database_name}.${table_name};`
    );
    console.log(result);
    const employee_names = result.map((row) => row.name);

    return employee_names;
  }

  async function deleteEmployee({ employee_id, database_name }) {
    console.info("Delete employee data-access");
    const [result] = await connection.query(
      `DELETE FROM ${database_name}.${table_name} WHERE employee_id = ?`,
      [employee_id]
    );
  }

  async function deleteEmployeeOfDeletedCompany({ company_id, database_name }) {
    console.info("Delete employee when company is deleted, data-access");
    const [result] = await connection.query(
      `DELETE FROM ${database_name}.${table_name} WHERE company_id = ?`,
      [company_id]
    );
    return result;
  }

  async function updateEmployee({
    employee_id,
    employee_name,
    role,
    company_id,
    company_name,
    database_name,
  }) {
    console.log("update employee");
    const [result] = await connection.query(
      `UPDATE ${database_name}.${table_name} SET name = ?,company_id=?,company_name=?,role=? WHERE employee_id = ?`,
      [employee_name, company_id, company_name, role, employee_id]
    );
    console.log("employee updated", result);
  }

  async function updateEmployeeWhenCompanyIsUpdated({
    company_id,
    company_name,
    database_name,
  }) {
    console.log("update employee when company table is updated data-access.");
    const [result] = await connection.query(
      `UPDATE ${database_name}.${table_name} SET company_name=? WHERE company_id = ?`,
      [company_name, company_id]
    );
    console.log("employee updated when company table is updated.", result);
  }

  async function updateVerificationStatus({
    employee_email,
    database_name,
    verification_token,
  }) {
    console.log("update verification status data-access.");
    await connection.query(
      `UPDATE ${database_name}.${table_name} SET verified = true WHERE email_id = ?;`,
      [employee_email]
    );
  }

  async function isVerifiedEmployee({ employee_id, database_name }) {
    console.info("employee's verification check by employee_id data-access");
    const [result] = await connection.query(
      `SELECT verified FROM employee WHERE employee_id = ?;`,
      [employee_id]
    );
    console.log(result);
    const { verified } = result[0];
    return verified;
  }

  async function authenticateEmployee({
    employee_email,
    password,
    database_name,
  }) {
    console.info("employee's authentication by employee_email data-access");
    const [result] = await connection.query(
      `SELECT verified FROM ${database_name}.${table_name} WHERE email_id = ? and password=?;`,
      [employee_email, password]
    );
    console.log(result);
    const {verified}=result[0];
    return verified;
  }


  async function getEmployeeIdByEmployeeEmail({
    employee_email,
    database_name,
  }) {
    console.info(`employee's of ${employee_email} data-access`);
    const result= await connection.query(
      `SELECT employee_id FROM ${database_name}.${table_name} WHERE email_id = ?`,
      [employee_email]
    );
    // console.log(result);
    const employee_id = result[0][0].employee_id;

    return employee_id;
  }
}

module.exports = makeEmployeeDbMethods;

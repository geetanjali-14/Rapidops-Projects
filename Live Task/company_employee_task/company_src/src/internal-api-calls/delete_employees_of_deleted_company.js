const axios = require('axios');

async function deleteEmployeeOfDeletedCompanyFunction({ company_id }) {
  try {
    const delete_status = await axios.delete(`http://localhost:8051/employee_company/${company_id}`);
    return delete_status;
  } catch (error) {
    throw new Error('Failed to fetch delete employees of deleted company');
  }
}

module.exports = {
    deleteEmployeeOfDeletedCompanyFunction,
};

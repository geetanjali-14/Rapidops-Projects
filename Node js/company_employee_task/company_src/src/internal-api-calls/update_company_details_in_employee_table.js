const axios = require('axios');

async function updateCompanyDetailsInEmployeeTableFunction({company_id,company_name,address}) {
  try {
    const payload = {
      company_name: company_name
    };
    const delete_status = await axios.put(`http://localhost:8051/employees/${company_id}`,payload);
    return delete_status;
  } catch (error) {
    throw new Error('Failed to fetch delete employees of deleted company');
  }
}

module.exports = {
    updateCompanyDetailsInEmployeeTableFunction,
};

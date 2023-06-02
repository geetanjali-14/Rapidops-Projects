const axios = require('axios');
// const { employee } = require('../../employee_src');

async function getAllEmployeesOfCompanyFunction({ company_name }) {
  try {
    const response = await axios.get(`http://localhost:8051/employee_list/${company_name}`);
    const employee_name = response.data.data;
    // console.log("employee_names",employee_name);
    return employee_name;
  } catch (error) {
    throw new Error('Failed to fetch company employees');
  }
}

module.exports = {
  getAllEmployeesOfCompanyFunction,
};

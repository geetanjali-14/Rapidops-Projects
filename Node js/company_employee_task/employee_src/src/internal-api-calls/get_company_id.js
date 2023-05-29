const axios = require('axios');
// const { company } = require('../../../company_src');

async function fetchCompanyIdByCompanyName({ company_name }) {
  try {
    console.log("External API find_company_id")
    const response = await axios.get(`http://localhost:8050/company/${company_name}`);
    const company_id = response.data.company_id;
    // console.log(company_id);
    return company_id;
  } catch (error) {
    throw new Error('Failed to fetch company ID');
  }
}

module.exports = {
  fetchCompanyIdByCompanyName,
};

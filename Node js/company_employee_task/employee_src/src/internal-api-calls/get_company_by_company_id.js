const axios = require('axios');
// const { company } = require('../../../company_src');

async function getCompanyNameByCompanyID({ company_id }) {
  try {
    const response = await axios.get(`http://localhost:8050/company_name/${company_id}`);
    const company_name = response.data.company_name;
    console.log(company_name);
    return company_name;
  } catch (error) {
    throw new Error('Failed to fetch company name By company ID');
  }
}

module.exports = {
  getCompanyNameByCompanyID,
};

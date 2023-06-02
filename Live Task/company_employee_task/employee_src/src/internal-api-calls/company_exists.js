const axios = require('axios');
// const { company } = require('../../../company_src');

async function getCompanyExists({ company_name }) {
  try {
    console.log("Company Exists external API")
    const response = await axios.get(`http://localhost:8050/company_exists/${company_name}`);
    const company_exists= response.data.company_exists;
    console.log(company_exists);
    return company_exists;
  } catch (error) {
    throw new Error('Failed to fetch company exists or not');
  }
}

module.exports = {
    getCompanyExists,
};

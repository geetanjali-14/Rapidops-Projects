const axios = require('axios');

async function getCompanyExistsById({ company_id }) {
  try {
    console.log("Company Exists by ID external API")
    const response = await axios.get(`http://localhost:8050/company_exists_by_id/${company_id}`);
    const company_exists= response.data.company_exists;
    console.log(company_exists);
    return company_exists;
  } catch (error) {
    throw new Error('Failed to fetch company exists or not');
  }
}

module.exports = {
  getCompanyExistsById,
};

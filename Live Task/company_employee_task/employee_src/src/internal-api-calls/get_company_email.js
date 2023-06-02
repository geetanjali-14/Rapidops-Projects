const axios = require('axios');

async function getCompanyEmailByCompanyID({ company_id }) {
  try {
    console.log("Api called for getCompanyEmailByCompanyID")
    const response = await axios.get(`http://localhost:8050/company_email/${company_id}`);
    const company_email = response.data.company_email;
    console.log(company_email);
    return company_email;
  } catch (error) {
    throw new Error('Failed to fetch company_email By company ID');
  }
}

module.exports = {
  getCompanyEmailByCompanyID,
};

module.exports = function makeGetCompanyEmailByCompanyID({
  axios,
  serviceEndpoints
}){
return async function getCompanyEmailByCompanyID({ companyId }) {
  try {
    console.log("Api called for getCompanyEmailByCompanyID",companyId)
    const response = await axios.get(`${serviceEndpoints.email}+${companyId}`);
    return response.data.companyEmail;
  } catch (error) {
    throw new Error('Failed to fetch company_email By company ID');
  }
}
}
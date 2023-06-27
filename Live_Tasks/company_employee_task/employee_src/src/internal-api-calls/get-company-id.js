module.exports = function makeGetCompanyID({
  axios,
  serviceEndpoints
}){
return async function fetchCompanyIdBy({ companyName }) {
  try {
    console.log("External API find_company_id")
    const response = await axios.get(`${serviceEndpoints.id}+${companyName}`);
    return response.data.companyId;
  } catch (error) {
    throw new Error('Failed to fetch company ID');
  }
}
}

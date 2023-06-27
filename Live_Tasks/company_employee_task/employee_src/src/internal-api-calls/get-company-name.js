module.exports = function makeGetCompanyNameByCompanyID({
  axios,
  serviceEndpoints
}){
return async function getCompanyNameByCompanyID({ companyId }) {
  try {
    const response = await axios.get(`${serviceEndpoints.name}+${companyId}`);
    return response.data.companyName;
  } catch (error) {
    throw new Error('Failed to fetch company name By company ID');
  }
}
}
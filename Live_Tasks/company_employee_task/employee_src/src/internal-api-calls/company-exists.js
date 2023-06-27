module.exports = function makeCompanyExists({
  axios,
  serviceEndpoints
}){
return async function companyExists({ companyName }) {
  try {
    console.log("Company Exists external API")
    const response = await axios.get(`${serviceEndpoints.exist}+name/${companyName}`);
    return response.data.companyExistsResult;
  } catch (error) {
    throw new Error('Failed to fetch company exists or not');
  }
}
}

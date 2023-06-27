module.exports = function makeCompanyExistsById({
  axios,
  serviceEndpoints
}){
return async function companyExistsById({ companyId }) {
  try {
    console.log("Company Exists by ID external API")
    const response = await axios.get(`${serviceEndpoints.exist}+id/+${companyId}`);

    return response.data.companyExistsResult;
  } catch (error) {
    throw new Error('Failed to fetch company exists or not');
  }
}
}

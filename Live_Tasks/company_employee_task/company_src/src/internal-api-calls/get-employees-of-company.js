module.exports = function makeGetAllEmployeeofCompany({
  axios,
  serviceEndpoints
}){
return async function getAllEmployeeofCompany({ companyName }) {
  try {
    const response = await axios.get(`${serviceEndpoints.list}+${companyName}`);
    return response.data.data;
    
  } catch (error) {
    throw new Error('Failed to fetch company employees');
  }
}
}
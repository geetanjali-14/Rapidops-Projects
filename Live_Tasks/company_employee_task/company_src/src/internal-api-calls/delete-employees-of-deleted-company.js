module.exports = function makeDeleteEmployeeOfDeletedCompany({
  axios,
  serviceEndpoints
}){
return async function deleteEmployeeOfDeletedCompany({ companyId }) {
  try {
    return await axios.delete(`${serviceEndpoints.employee}+${companyId}`);
  } catch (error) {
    throw new Error('Failed to fetch delete employees of deleted company');
  }
}
}
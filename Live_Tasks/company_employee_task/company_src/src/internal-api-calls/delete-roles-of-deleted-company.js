module.exports = function makeDeleteRolesOfDeletedCompany({
  axios,
  serviceEndpoints
}){
return async function deleteRolesOfDeletedCompany({ companyId }) {
  try {
    return await axios.delete(`${serviceEndpoints.role}+${companyId}`);
  } catch (error) {
    throw new Error('Failed to fetch delete roles of deleted company');
  }
}
}
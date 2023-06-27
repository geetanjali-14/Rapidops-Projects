module.exports = function makeUpdateCompanyDetailsInEmployeeTable({
  axios,
  serviceEndpoints
}){
return async function updateCompanyDetailsInEmployeeTable({
  companyId,
  companyName,
}) {
  try {
    const payload = {
      companyName: companyName,
    };
    return await axios.put(
      `${serviceEndpoints.update}+${companyId}`,
      payload
    );
  } catch (error) {
    throw new Error("Failed to update employee table");
  }
}
}

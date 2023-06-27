module.exports = function makeGetAllCompany({companyDB }) {
    return async function createGetAllCompany() {
      console.info(`Inside get all Company list use case`);
      try {
        console.log("get all Company use-case");
        return await companyDB.getAllCompanies();
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };
  
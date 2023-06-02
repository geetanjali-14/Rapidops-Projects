module.exports = function makeGetAllCompanyUseCase({companyDB }) {
    return async function createGetAllCompanyFunction({
      database_name,
    }) {
      console.info(`Inside get all Company list use case`);
      try {
        console.log("get all Company use-case");
        const result = await companyDB.getAllCompanies({
          database_name,
        });
        console.log("Exiting get all Company list in Company Usecase",result);
        return result;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };
  
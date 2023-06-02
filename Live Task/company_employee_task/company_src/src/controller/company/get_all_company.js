module.exports = function makeGetAllCompanyController({Joi, getAllCompany}) {
    return async function createGetAllCompanyController(req,res) {
      console.info(`Inside get all Company list controller`);
      try {
        const database_name = req.headers["database_name"];
        console.log("get all Company controller");
        const result = await getAllCompany({
          database_name,
        });
        console.log("Exiting get all Company list in Company controller",result);
        res.status(201).json({
            status: "Success",
            messege: "Company List recieved",
          });
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };
  
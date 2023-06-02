module.exports = function makeGetAllEmployeesController({Joi, getAllEmployees}) {
    return async function createGetAllEmployeesController(req,res) {
      console.info(`Inside get all employee list controller`);
      try {
        const database_name = req.headers["database_name"];
        console.log("get all employee controller");
        const result = await getAllEmployees({
          database_name,
        });
        console.log("Exiting get all employee list in employees controller",result);
        return result;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };
  
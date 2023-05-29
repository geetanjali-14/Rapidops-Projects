module.exports = function makeGetEmployeesByCompanyNameController({
    Joi,
    getEmployees,
  }) {
    return async function createGetEmployeesByCompanyNameController(req, res) {
      console.info("Inside get employee's company controller");
  
      const { company_name } = req.params;
      validateInput({ company_name });
  
      try {
        const database_name = "employee";
        console.log("get employee's company controller");
        const result = await getEmployees({
          company_name,
          database_name,
        });
        console.log("Exiting get employee's company in employees controller",result);
        res.status(200).json({
          status: "Success",
          message: "Employees fetched successfully",
          data: result,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          status: "Error",
          message: err.message,
        });
      }
    };
  
    function validateInput({ company_name }) {
      const schema = Joi.object({
        company_name: Joi.string().required(),
      });
      const { error } = schema.validate({
        company_name,
      });
      if (error) {
        console.error(error);
        throw new Error(`${error.details[0].message}`);
      }
    }
  };
  
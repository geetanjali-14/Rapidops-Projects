module.exports = function makeDeleteEmployeesOfDeletedCompanyController({
  Joi,
  deleteEmployeeOfDeletedCompany,
  companyExistsById
}) {
  return async function createDeleteEmployeesOfDeletedCompanyController(
    req,
    res
  ) {
    const company_id = req.params.company_id;
    const database_name = "employee";

    console.info(`Inside delete employee when company is deleted Controller`);
    validateInput({ company_id });
    try {
      console.log("delete employee when company is deleted Controller");

      const company_exists = await companyExistsById({ company_id });
      console.log("company_exists", company_exists);

      if (company_exists) {
        const result = await deleteEmployeeOfDeletedCompany({
          company_id,
          database_name,
        });
        console.log(
          "Exiting delete employee when company is deleted Controller"
        );
        return result;
      } 
      else {
        console.info("Company ID Entered Dose not exists");
        res
          .status(403)
          .json({ message: "Company with this ID does not exist" });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function validateInput({ company_id }) {
    const schema = Joi.object({
      company_id: Joi.number().integer().required(),
    });

    const { error } = schema.validate({ company_id });
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

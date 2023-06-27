module.exports = function makeCreateCompany({
  createCompany,
}) {
  return async function createCreateCompany(req, res) {
    console.log("Entering create company Controller with input as", req.body);
    try {
      const {companyName,address,companyEmail} = req.body;
        const companyID = await createCompany({
          companyName,
          address,
          companyEmail,
        });
       res.status(201).json({
          status: "Success",
          message: "Company created",
          companyID:companyID,
        });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };
};

module.exports = function makeGetAllCompany({ getAllCompany }) {
  return async function CreateGetAllCompany(req, res) {
    console.info("Inside get all Company list controller");
    try {
      console.log("get all Company controller");
      const result = await getAllCompany();
      res.status(200).json({
        status: "Success",
        message: "Company List received",
        data: result,
      });
    } catch (error) {
      throw error;
    }
  };
};

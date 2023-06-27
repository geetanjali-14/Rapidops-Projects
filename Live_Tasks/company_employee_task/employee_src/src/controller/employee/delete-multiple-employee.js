module.exports = function makeDeleteMultipleEmployee({
  deleteMultipleEmployees,
  
}) {
  return async function createDeleteMultipleEmployee(req, res) {
    console.log("Entering delete employee Controller with input as ", req.body);
    try {
      const {accessTokens} = req.body;
      await deleteMultipleEmployees({ accessTokens });
      
      return res.status(200).json({
        status: "Success",
        message: "Employees deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };
};

module.exports = function makeDeleteEmployee({ deleteEmployee }) {
  return async function createDeleteEmployee(req, res) {
    console.log(
      "Entering delete employee Controller with input as ",
      req.params
    );
    try {
      const {employeeId} = req.params;
      const {accessToken} = req.body;

      await deleteEmployee({ employeeId, accessToken });

      console.info("Delete Employee Controller");
      res.status(200).json({
        status: "Success",
        message: "Employee deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };
};

module.exports = function makeGetAllEmployees({
  getAllEmployees,
 
}) {
  return async function createGetAllEmployees(req, res) {
    console.info(`Inside get all employee list controller`);
    const {accessToken} = req.body;
    try {
      console.log("get all employee controller");
      const result= await getAllEmployees({accessToken});
          res.status(200).json({
            status: "Success",
            message: "Employee list retrieved successfully",
            Employees:result,
          });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "Error",
        message: err.message,
      });
    }
  };
};

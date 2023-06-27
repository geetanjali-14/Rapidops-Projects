module.exports = function makeFilterEmployee({
  filterEmployee,
}) {
  return async function createFilterEmployee(req, res) {
    console.log("Entering create employee Controller with input as ", req.body);
    try {
      const { city, device, browser } = req.body;

      const filters = {};
      if (city) {
        filters.city = city;
      }
      if (device) {
        filters.device = device;
      }
      if (browser) {
        filters.browser = browser;
      } else if (Object.keys(filters).length === 0) {
        throw new Error("No filter criteria provided");
      }
      const filteredEmployeesList = await filterEmployee({
        filters,
      });
      console.log(filteredEmployeesList);

      return res.status(200).json({
        status: "Success",
        message: "Filtered employees successfully",
        EmployeeDetails:filteredEmployeesList.filteredEmployees
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: "Error",
        message: error.message,
      });
    }
  };
};

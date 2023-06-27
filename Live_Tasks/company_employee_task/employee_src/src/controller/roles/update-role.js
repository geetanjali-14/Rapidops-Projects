module.exports = function makeUpdateRole({ updateRole }) {
    return async function createUpdateRole(req, res) {
      console.log("Entering update role Controller with input as ", req.body);
      try {
        const {roleId,permissions,employeeId} = req.body;
  
        await updateRole({roleId,permissions,employeeId});
        console.info("Exiting Create Role Controller");
        res.status(201).json({
          status: "Success",
          message: "Role created",
        });
      } catch (error) {
        res.status(500).json({
          status: "Error",
          message: error.message,
        });
      }
    };
  };
  
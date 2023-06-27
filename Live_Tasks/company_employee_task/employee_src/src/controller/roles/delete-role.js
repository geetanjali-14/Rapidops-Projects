module.exports = function makeDeleteRoleController({ deleteRole }) {
    return async function deleteRoleController(req, res) {
      console.log("Entering delete role Controller with input as ", req.body);
      try {
        const {roleId} = req.body;
  
        await deleteRole({ roleId });
        console.info("Exiting Delete Role Controller");
        res.status(200).json({
          status: "Success",
          message: "Role deleted",
        });
      } catch (error) {
        res.status(500).json({
          status: "Error",
          message: error.message,
        });
      }
    };
  };
  
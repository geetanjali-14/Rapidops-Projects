module.exports = function makeCreateRole({ createRole }) {
  return async function createCreateRole(req, res) {
    // console.log("Entering create role Controller with input as ", req.body);
    try {
      const {name,companyId,permissions,isMaster,permissionsFor,accessToken} = req.body;
      await createRole({name,companyId,permissions,isMaster,permissionsFor,accessToken});
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

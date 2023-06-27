module.exports = function createDeleteRolesOfDeletedCompany({
    deleteRolesOfDeletedCompany,
  }) {
    return async function createDeleteRolesOfDeletedCompany(req, res) {
      const {companyId} = req.params;
  
      console.info(`Inside delete roles when company is deleted Controller`);
      try {
        console.log("delete roles when company is deleted Controller");
        await deleteRolesOfDeletedCompany({
          companyId,
        });
  
        console.log("Exiting delete roles when company is deleted Controller");
        res.status(200).json({
          status: "Success",
          message: "Employees of the roles company have been deleted",
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
  
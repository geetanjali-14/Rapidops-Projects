module.exports = function makeCheckPermission({
  permissionList,
  getEmployeeRole,
  isMaster,
  accessTokenExists,
  getEmployeeIdByAccessToken,
  fetchPermissionFromRoleId,
  accessTokenExpirationTime,
  InvalidAccessError,
}) {
  return async function createCheckPermissions(req, res, next) {
    try {
      console.log("In middleware");
      const { method } = req;
      const accessToken = req.body.accessToken;

      const accessTokenExistsResult = await accessTokenExists({ accessToken });
      if (!accessTokenExistsResult) {
        throw new InvalidAccessError("Access Token is Invalid");
      }
      const accessTokenExpirationTimeResult = await accessTokenExpirationTime({
        accessToken,
      });

      if (Date.parse(accessTokenExpirationTimeResult) <= Date.now()) {
        throw new InvalidAccessError("Access token has expired. Login Again.");
      }
      const employeeId = await getEmployeeIdByAccessToken({ accessToken });

      const isMasterResult = await isMaster({ employeeId });
      if (!isMasterResult) {
        const roles = await getEmployeeRole({ employeeId });

        const obtainedPermissions = [];
        for (const roleId of roles) {
          let rolePermissions = await fetchPermissionFromRoleId({ roleId });
          rolePermissions = JSON.parse(rolePermissions);
          obtainedPermissions.push(rolePermissions);
        }

        let hasPermission = false;
        for (const obtainedPermission of obtainedPermissions) {
          for (const entity in obtainedPermission) {
            const entityPermissions = obtainedPermission[entity];

            const availablePermissions = permissionList[entity];

            if (!availablePermissions) {
              continue;
            }

            for (const permission in entityPermissions) {
              if (
                availablePermissions.hasOwnProperty(permission) &&
                entityPermissions[permission] === method
              ){
                hasPermission = true;
                break;
              }
            }
          }
        }
        if (hasPermission) {
          console.log("Exiting middleware");
          next();
        } else {
          res.status(403).json({ message: "Invalid permission" });
        }
      }
      console.log("Exiting middleware");
      next();
    } catch (e) {
      throw e;
    }
  };
};

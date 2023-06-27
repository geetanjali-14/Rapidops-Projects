module.exports = function makeCreateRole({
  Joi,
  rolesDB,
  isMasterRole,
  getEmployeeIdByAccessToken,
  roleExists,
  permissionList,
  ValidationError,
  InvalidAccessError,
  DuplicateObjectDeclarationError,
}) {
  return async function createRole({
    name,
    companyId,
    permissions,
    isMaster,
    accessToken,
  }) {
    console.log("Entering create role Usecase ");
    try {
      validateInputData({
        name,
        companyId,
        permissions,
        isMaster,
        accessToken,
      });
      const lowerCaseName = name.toLowerCase();
      const roleExistsResult = await roleExists({ role: lowerCaseName });
      if (roleExistsResult) {
        throw new DuplicateObjectDeclarationError("Role Already Exists");
      }

      const employeeId = await getEmployeeIdByAccessToken({ accessToken });

      const isMasterResult = await isMasterRole({ employeeId });
      if (!isMasterResult) {
        throw new InvalidAccessError("Access Denied for this role");
      }
      for (const key in permissions) {
        const permissionKey = key;
        const permissionValues = permissions[key] || [];

        if (!permissionList.hasOwnProperty(permissionKey)) {
          throw new InvalidAccessError(
            `Invalid permission key: ${permissionKey}`
          );
        }

        const predefinedPermissions = Object.values(
          permissionList[permissionKey]
        );

        for (const value of permissionValues) {
          if (!predefinedPermissions.includes(value)) {
            throw new InvalidAccessError(`Invalid permission value: ${value}`);
          }
        }
      }
      return await rolesDB.createRole({
        name: lowerCaseName,
        companyId,
        permissions,
        isMaster,
      });
    } catch (error) {
      throw error;
    }
  };

  function validateInputData({
    name,
    companyId,
    permissions,
    isMaster,
    accessToken,
  }) {
    const schema = Joi.object({
      name: Joi.string().required(),
      companyId: Joi.number().required(),
      permissions: Joi.object()
        .pattern(Joi.string(), Joi.array().items(Joi.string()).required())
        .required(),
      isMaster: Joi.boolean().required(),
      accessToken: Joi.string().required(),
    });

    const { error } = schema.validate({
      name,
      companyId,
      permissions,
      isMaster,
      accessToken,
    });

    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

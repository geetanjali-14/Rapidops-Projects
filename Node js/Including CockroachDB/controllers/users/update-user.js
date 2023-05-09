module.exports = function makeUpdateUserController({
  Joi,
  updateUser,
  userExists,
}) {
  return async function updateUserController(req, res) {
    console.info(`In update user controller`, req.params, req.body);
    try {
      validParamsInput(req.params);
      validBodyInput(req.body);
      const database_name = req.headers["database_name"];

      const id = req.params.id;
      const name = req.body.name;

      const ans = await userExists({ id ,database_name});
      console.log(ans);
      if (ans) {
        await updateUser({ id, name ,database_name});
        res.status(201).json({
          status: "Success",
          messege: "User updated",
        });
      } else {
        console.log("User dosen't Exists");
        res.status(201).json({
          status: "Success",
          messege: "User not exists",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Error",
        messege: err.message,
      });
    }
  };

  function validBodyInput(body) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
    });
    const { error } = schema.validate(body);
    if (error) {
      console.log(error);
      throw error;
    }
  }
  function validParamsInput(params) {
    const schema = Joi.object().keys({
      id: Joi.number().integer().required(),
    });
    const { error } = schema.validate(params);
    if (error) {
      console.log(error);
      throw error.details[0].message;
    }
  }
};

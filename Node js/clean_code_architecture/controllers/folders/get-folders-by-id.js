module.exports = function makeGetFolderByIdController({
  Joi,
  getFolderById,
  userExists,
}) {
  return async function getFolderByIdController(req, res) {
    console.info(`In get folders by user_id controller`, req.params);
    try {
      validInput(req.params);
      const id = req.params.id;

      const ans = await userExists({ id });
      console.log(ans);

      if (ans) {
        await getFolderById({ id });
        res.status(201).json({
          status: "Success",
        });
      } else {
        console.log("user dosen't Exists");
        res.status(201).json({
          status: "Success",
          messege: "user not exists",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Error",
        messege: err.message,
      });
    }
  };
  function validInput(params) {
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

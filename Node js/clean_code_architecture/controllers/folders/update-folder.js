module.exports = function makeUpdateFolderController({
  Joi,
  updateFolder,
  folderExists,
}) {
  return async function updateFolderController(req, res) {
    console.info(`In update folder controller`, req.params, req.body);
    try {
      validParamsInput(req.params);
      validBodyInput(req.body);

      const user_id = req.body.user_id;
      const name = req.body.name;
      const folder_id = req.params.folder_id;

      const ans = await folderExists({ user_id, name });
      console.log(ans);
      if (ans !== 0) {
        console.log("Folder Already Exist");
        res.send("Folder Already Exist");
      } else {
        await updateFolder({ folder_id, name });
        res.status(201).json({
          status: "Success",
          messege: "Folder Updated successfully ",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Error",
        messege: "Error " + err,
      });
    }
  };
  function validBodyInput(body) {
    const schema = Joi.object().keys({
      user_id: Joi.number().integer().required(),
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
      folder_id: Joi.number().integer().required(),
    });
    const { error } = schema.validate(params);
    if (error) {
      console.log(error);
      throw error.details[0].message;
    }
  }
};

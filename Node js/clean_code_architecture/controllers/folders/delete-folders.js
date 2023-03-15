module.exports = function makeDeleteFolderController({
  Joi,
  deleteFolder,
  folderExists,
}) {
  return async function deleteFolderController(req, res) {
    console.info(`In delete folder controller`, req.params);
    try {
      validInput(req.params);
      const id = req.params.id;

      const ans = await folderExists({ id });
      console.log(ans);

      if (ans == 1) {
        await deleteFolder({ id });
        res.status(201).json({
          status: "Success",
          messege: "Folder Deleted",
        });
      } else {
        console.log("folder dosen't Exists");
        res.status(201).json({
          status: "Success",
          messege: "folder not exists",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Error",
        messege: "Error " + err,
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

module.exports = function makeDeleteFolderController({
  Joi,
  deleteFolder,
  folderExistsByFolderId
}) {
  return async function deleteFolderController(req, res) {
    console.info(`In delete folder controller`);
    try {
      validInput(req.params);
      const folder_id = req.params.id;

      const ans = await folderExistsByFolderId({ folder_id });
      // console.log(ans);

      if (ans) {
        await deleteFolder({ folder_id });
        res.status(201).json({
          status: "Success",
          messege: "Folder Deleted",
        });
      } else {
        console.log("folder dosen't Exists");
        res.status(201).json({
          status: "Success",
          messege: "folder of this ID dosen't exists",
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

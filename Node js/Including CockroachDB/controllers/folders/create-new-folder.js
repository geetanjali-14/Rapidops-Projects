module.exports = function makeCreateFolderController({
  Joi,
  createFolder,
  folderExists,
}) {
  return async function createFolderController(req, res) {
    // console.info(`In create folder controller`, req.body);
    try {
      validInput(req.body);
      const folderName = req.body.name;
      const user_id = req.body.user_id;
      const database_name = req.headers["database_name"];
      const folderproviderid=req.body.folderproviderid;
      const ans = await folderExists({user_id,name:folderName,database_name});
      console.log(ans);
      if (ans) {
        res.send("Folder Already Exists");
      } else {
        await createFolder({ user_id, folderName ,database_name,folderproviderid});
        res.status(201).json({
          status: "Success",
          messege: "Folder Created",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Error",
        messege: err.messege,
      });
    }
  };
  function validInput(body)
  {
      const schema = Joi.object().keys({
      user_id: Joi.number().integer().required(),
      folderName: Joi.string().required(),
      folderproviderid:Joi.number()
      })
      const {error}=schema.validate(body);
      if(error)
      {
          console.log(error);
          throw new Error(`${error.details[0].message}`);
      }
  }
};

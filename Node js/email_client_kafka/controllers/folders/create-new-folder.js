module.exports = function makeCreateFolderController({
  Joi,
  createFolder,
  folderExists,
}) {
  return async function createFolderController(req, res) {
    console.info(`In create folder controller`, req.body);
    try {
      validInput(req.body);
      const name = req.body.name;
      const user_id = req.body.user_id;
      // console.log(name,id);
      const ans = await folderExists({user_id,name});
      console.log(ans);
      if (ans) {
        console.log("Folder Exists");
        res.send("Folder Already Exists");
      } else {
        console.log("Not Exists");
        await createFolder({ user_id, name });
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
      name: Joi.string().required(),
      })
      const {error}=schema.validate(body);
      if(error)
      {
          console.log(error);
          throw new Error(`${error.details[0].message}`);
      }
  }
};

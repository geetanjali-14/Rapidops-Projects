module.exports = function makeCreateFolderController({
  Joi,
  createFolder,
  folderExists,
}) {
  return async function createFolderController(req, res) {
    console.info(`In create folder controller`, req.body);
    try {
      const name = req.body.name;
      const id = req.body.id;
      // validInput(body);
      const ans = await folderExists({ id });
      console.log(ans);
      if (ans == 1) {
        console.log("Folder Exists");
        res.send("Folder Already Exists");
      } else {
        console.log("Not Exists");
        await createFolder({ id, name });
        res.status(201).json({
          status: "Success",
          messege: "Folder Created",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Error",
        messege: err,
      });
    }
  };
};

module.exports = function makeUploadFile({ uploadFile }) {
  return async function createUploadFile(req, res) {
    console.log("Entering upload file Controller with input as ", req.file);
    try {
      const {file} = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      await uploadFile({ file });
      return res.status(200).json({
        status: "Success",
        message: "File Uploaded Successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

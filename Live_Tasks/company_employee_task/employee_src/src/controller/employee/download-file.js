module.exports = function makeDownloadFile({ downloadFile }) {
    return async function createDownloadFile(req, res) {
      console.log("Entering download file Controller with input as", req.params);
      try {
        const {fileName} = req.params;
        if (!fileName) {
          return res.status(400).json({ error: 'No file specified for download' });
        }
        const {localPath} = await downloadFile({ fileName });
        
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    };
  };
  
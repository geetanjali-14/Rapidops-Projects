module.exports = function makeUploadFile({ Joi,Storage, gcpConfig ,ValidationError}) {
  return async function createUploadFile({ file }) {
    try {
      validateInputData({
       file
      });
      const storage = new Storage({
        projectId: gcpConfig.gcpStorage.projectId,
        keyFilename: gcpConfig.gcpStorage.keyFilename,
      });
      const bucketName = gcpConfig.gcpStorage.bucketName;

      const fileName = Date.now() + "-" + file.originalname;
      const fileDestination = `${bucketName}/${fileName}`;

      await storage.bucket(bucketName).upload(file.path, {
        destination: fileDestination,
        public: true,
        metadata: {
          contentType: file.mimetype,
        },
      });

      return `https://storage.googleapis.com/${bucketName}/${fileName}`;

    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  function validateInputData({ file }) {
    const fileSchema = Joi.object({
      originalname: Joi.string().required(),
      path: Joi.string().required(),
      mimetype: Joi.string().required(),
    });
  
    const { error } = fileSchema.validate(file);
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  } 
};

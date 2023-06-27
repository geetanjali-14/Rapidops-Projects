module.exports = function makeDownloadFile({
  Joi,
  Storage,
  gcpConfig,
  ValidationError,
  ForbiddenError,
}) {
  return async function createDownloadFile({ fileName }) {
    try {
      validateInputData({
        fileName,
      });
      const storage = new Storage({
        projectId: gcpConfig.gcpStorage.projectId,
        keyFilename: gcpConfig.gcpStorage.keyFilename,
      });
      const bucketName = gcpConfig.gcpStorage.bucketName;
      const fileDestination = fileName;

      const bucket = storage.bucket(bucketName);
      const file = bucket.file(fileDestination);

      const [metadata] = await file.getMetadata();
      if (metadata && metadata.size === "0") {
        throw new ForbiddenError("File not found");
      }

      const localPath = `/downloads/${fileName}`;
      await file.download({ destination: localPath });

      console.log(`File downloaded to ${localPath}`);

      return { localPath };
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

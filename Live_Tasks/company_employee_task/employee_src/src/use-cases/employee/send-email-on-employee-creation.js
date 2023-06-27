module.exports = function makeEmployeeCreationEmailSend({
  Joi,
  ValidationError,
  nodemailer,
  getCompanyEmailbyCompanyId,
  crypto,
}) {
  return async function makeEmployeeCreationEmailSend({
    employeeEmail,
    companyId,
  }) {
    console.info('Inside makeEmployeeCreationEmailSendUseCase', employeeEmail, companyId);
    const companyEmail = await getCompanyEmailbyCompanyId({ companyId });
    validateInputData({ employeeEmail, companyId, companyEmail });

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'geetanjalilodhiltp@gmail.com',
          pass: 'odtlmntvtptigiku',
        },
      });

      const generateVerificationToken = () => {
        const token = crypto.randomBytes(20).toString('hex');
        return token;
      };

      const verificationToken = generateVerificationToken();

      const employeeEmailOptions = {
        from: 'geetanjalilodhiltp@gmail.com',
        to: employeeEmail,
        subject: 'Account Verification for new employee',
        html: `
          <p>Dear employee,</p>
          <p>Please click the following link to verify your account:</p>
          <a href="http://localhost:8053/employee/${encodeURIComponent(
            employeeEmail
          )}/${verificationToken}">Verify Account</a>
        `,
      };

      const companyMailOptions = {
        from: 'geetanjalilodhiltp@gmail.com',
        to: companyEmail,
        subject: 'Congratulations! A New Employee has been added to your company',
        text: 'Your company has a new employee.',
      };

      await transporter.sendMail(employeeEmailOptions);
      console.log('Email sent to employee:', employeeEmail);

      await transporter.sendMail(companyMailOptions);
      console.log('Email sent to company:', companyEmail);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function validateInputData({ employeeEmail, companyId, companyEmail }) {
    const schema = Joi.object({
      employeeEmail: Joi.string().email().required(),
      companyId: Joi.number().integer().required(),
      companyEmail: Joi.string().email().required(),
    });

    const { error } = schema.validate({ employeeEmail, companyId, companyEmail });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

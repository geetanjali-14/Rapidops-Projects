module.exports = function makeEmployeeCreationEmailSendUseCase({
  Joi,
  ValidationError,
  nodemailer,
  getCompanyEmailbyCompanyId,
  crypto,
  createupdateEmployeeVerificationToken,
}) {
  return async function makeEmployeeCreationEmailSendFunction({
    employee_email,
    company_id,
  }) {
    console.info(
      'Inside makeEmployeeCreationEmailSendUseCase',
      employee_email,
      company_id
    );
    const company_email = await getCompanyEmailbyCompanyId({ company_id });
    validateInput({ employee_email, company_id, company_email });
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

      const verification_token = generateVerificationToken();

      const employeeEmailOptions = {
        from: 'geetanjalilodhiltp@gmail.com',
        to: employee_email,
        subject: 'Account Verification for new employee',
        html: `
          <p>Dear employee,</p>
          <p>Please click the following link to verify your account:</p>
          <a href="http://localhost:8051/employee/${encodeURIComponent(
            employee_email
          )}/${verification_token}">Verify Account</a>
        `,
      };

      const companyMailOptions = {
        from: 'geetanjalilodhiltp@gmail.com',
        to: company_email,
        subject: 'Congratulations! A New Employee has been added to your company',
        text: 'Your company has a new employee.',
      };

      transporter.sendMail(employeeEmailOptions, async function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent to employee: ' + info.response);
        }
      });

      transporter.sendMail(companyMailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent to company: ' + info.response);
        }
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function validateInput({ employee_email, company_id, company_email }) {
    const schema = Joi.object({
      employee_email: Joi.string().email().required(),
      company_id: Joi.number().integer().required(),
      company_email: Joi.string().email().required(),
    });

    const { error } = schema.validate({
      employee_email,
      company_id,
      company_email,
    });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

module.exports = function makeEmployeeCreationEmailSendUseCase({
  Joi,
  ValidationError,
  nodemailer,
  getCompanyEmailbyCompanyId,
}) {
  return async function makeEmployeeCreationEmailSendFunction({
    employee_email,
    company_id,
  }) {
    console.info(`Inside makeEmployeeCreationEmailSendUseCase`, employee_email,company_id);

    const company_email=await getCompanyEmailbyCompanyId({company_id});
    validateInput({ employee_email,company_id,company_email });
    try {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "geetanjalilodhiltp@gmail.com",
          pass: "odtlmntvtptigiku",
        },
      });
      var employeeEmailOptions = {
        from: "geetanjalilodhiltp@gmail.com",
        to: employee_email,
        subject: "Welcome, New Employee !",
        text: "Your data has been inserted in the Employee table.",
      };
      var companyMailOptions = {
        from: "geetanjalilodhiltp@gmail.com",
        to: company_email,
        subject: "COngrats, New Employee is added in your company!",
        text: "Your company has got a new Employee.",
      };

      transporter.sendMail(employeeEmailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent to employee: " + info.response);
        }
      });
      transporter.sendMail(companyMailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent company: " + info.response);
        }
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  function validateInput({ employee_email,company_id,company_email }) {
    const schema = Joi.object({
      employee_email: Joi.string().email().required(),
      company_id:Joi.number().integer().required(),
      company_email:Joi.string().email().required(),
    });

    const { error } = schema.validate({ employee_email,company_id,company_email });
    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

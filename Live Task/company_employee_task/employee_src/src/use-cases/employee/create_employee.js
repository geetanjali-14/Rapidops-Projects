module.exports = function makeCreateEmployeeUseCase({
  Joi,
  Kafka,
  employeeDB,
  ValidationError,
  companyExists,
  ForbiddenError,
}) {
  return async function createEmployeeFunction({
    employee_name,
    role,
    company_id,
    company_name,
    employee_email,
    database_name,
  }) {
    console.info('Inside create employee use case');
    validateInput({ employee_name, role, company_id, company_name, employee_email });
    console.log('Create employee use-case');

    const companyExistsResult = await companyExists({ company_name });
    console.log('company_exists', companyExistsResult);

    if (companyExistsResult) {
      const result = await employeeDB.createEmployee({
        employee_name,
        role,
        company_id,
        company_name,
        employee_email,
        database_name,
      });
      console.log('Exiting create employee Usecase');

      const kafka = new Kafka({
        clientId: 'send-email-on-email-creation',
        brokers: ['localhost:9092'],
      });
      const producer = kafka.producer();

      const data = {
        employee_email,
        company_id,
      };
      const run = async () => {
        await producer.connect();
        console.log('Producer connected successfully');

        const message = {
          value: JSON.stringify(data),
        };

        await producer.send({
          topic: 'email_sent_on_employee_creation',
          messages: [message],
        });
        console.log('Message sent:', message.value.toString());

        await producer.disconnect();
      };

      await run();

      return result;
    } else {
      console.info('Company Entered Does not exist');
      throw new ForbiddenError('Company with this name does not exist');
    }
  };

  function validateInput({ employee_name, role, company_id, company_name, employee_email }) {
    const schema = Joi.object({
      employee_name: Joi.string().required().messages({
        'string.base': '"employee_name" must be a string',
      }),
      role: Joi.string().required().messages({
        'string.base': '"role" must be a string',
      }),
      company_id: Joi.number().required().messages({
        'number.base': '"company_id" must be a number',
      }),
      company_name: Joi.string().required().messages({
        'string.base': '"company_name" must be a string',
      }),
      employee_email: Joi.string().email().required().messages({
        'string.base': '"employee_email" must be a string',
        'string.email': '"employee_email" must be a valid email',
      }),
    });

    const { error } = schema.validate({
      employee_name,
      role,
      company_id,
      company_name,
      employee_email,
    });

    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

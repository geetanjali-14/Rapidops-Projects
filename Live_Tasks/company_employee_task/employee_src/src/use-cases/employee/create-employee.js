module.exports = function makeCreateEmployee({
  Joi,
  Kafka,
  employeeDB,
  companyExists,
  employeeEmailExists,
  ValidationError,
  ObjectNotFoundError,
  DuplicateObjectDeclarationError,
}) {
  return async function createEmployee({
    employeeName,
    jobTitle,
    companyId,
    companyName,
    employeeEmail,
    password,
  }) {
    console.info("Inside create employee use case");
    console.log("EMPLOYEE NAME", employeeName);
    validateInputData({
      employeeName,
      jobTitle,
      companyId,
      companyName,
      employeeEmail,
      password,
    });

    console.log("Create employee use-case", employeeEmail);
    const employeeEmailExistsResult = await employeeEmailExists({
      employeeEmail,
    });
    console.log("employeeEmailExistsResult");
    if (employeeEmailExistsResult) {
      throw new DuplicateObjectDeclarationError("Employee with this email already exists");
    }

    const companyExistsresult = await companyExists({ companyName });
    console.log("company_exists", companyExistsresult);

    if (!companyExistsresult) {
      throw new ObjectNotFoundError("Company with this name does not exist");
    }

    const result = await employeeDB.createEmployee({
      employeeName,
      jobTitle,
      companyId,
      companyName,
      employeeEmail,
      password,
    });
    console.log("Exiting create employee Usecase", result);

    const kafka = new Kafka({
      clientId: "send-email-on-employee-creation",
      brokers: ["localhost:9092"],
    });
    const producer = kafka.producer();

    const data = {
      employeeEmail,
      companyId,
    };

    const run = async () => {
      await producer.connect();
      console.log("Producer connected successfully");

      const message = {
        value: JSON.stringify(data),
      };

      await producer.send({
        topic: "email-sent-on-employee-creation",
        messages: [message],
      });
      console.log("Message sent:", message.value.toString());

      await producer.disconnect();
    };
    await run();
    return result;
  };

  function validateInputData({
    employeeName,
    jobTitle,
    companyId,
    companyName,
    employeeEmail,
    password,
  }) {
    const schema = Joi.object({
      employeeName: Joi.string().required(),
      jobTitle: Joi.string().required(),
      companyId: Joi.number().required(),
      companyName: Joi.string().required(),
      employeeEmail: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });

    const { error } = schema.validate({
      employeeName,
      jobTitle,
      companyId,
      companyName,
      employeeEmail,
      password,
    });

    if (error) {
      console.error(error);
      throw new ValidationError(`${error.details[0].message}`);
    }
  }
};

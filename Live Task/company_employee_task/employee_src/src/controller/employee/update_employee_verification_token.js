module.exports = function makeupdateEmployeeVerificationToken({
  Joi,
  updateEmployeeVerificationToken,
  employeeEmailExists,
}) {
  return async function createupdateEmployeeVerificationToken(req, res) {
    console.info('Inside update employee verification token controller');

    const { employee_email, verification_token } = req.params;
    const database_name = 'employee';
    validateInput({ employee_email, verification_token });
    try {
      console.info('update employee verification token controller');
      const employee_exists = await employeeEmailExists({
        employee_email,
        database_name,
      });
      console.log('employee_exists', employee_exists);

      if (employee_exists) {
        const result = await updateEmployeeVerificationToken({
          employee_email,
          verification_token,
          database_name,
        });
        console.log('Exiting update employee verification token controller');
        res.send('Updated employee verification token'); 
      } else {
        console.info('Employee Email entered does not exist');
        res.send('Employee Email entered does not exist'); 
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };

  function validateInput({ employee_email, verification_token }) {
    const schema = Joi.object({
      employee_email: Joi.string().required(),
      verification_token: Joi.string().required(),
    });

    const { error } = schema.validate({ employee_email, verification_token });
    if (error) {
      console.error(error);
      throw new Error(`${error.details[0].message}`);
    }
  }
};

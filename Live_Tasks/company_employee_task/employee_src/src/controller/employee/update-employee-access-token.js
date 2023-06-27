module.exports = function makeupdateEmployeeVerificationToken({
  updateEmployeeVerificationToken,
}) {
  return async function createupdateEmployeeVerificationToken(req, res) {
    console.info('Inside update employee verification token controller');

    const { employeeEmail, verificationToken } = req.params;

    try {
      console.info('update employee verification token controller',req.params);
      
        await updateEmployeeVerificationToken({
          employeeEmail,
          verificationToken,
        });
        console.log('Exiting update employee verification token controller');
        res.send('Updated employee verification token');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };
};

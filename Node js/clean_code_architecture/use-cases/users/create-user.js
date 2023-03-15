module.exports = function makeCreateUserUseCase({ usersDb }) {
  return async function createUserUsecase({ name, email, password }) {
    console.info(`Inside create user use case`);
    try {
      await usersDb.createUser({ name, email, password });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

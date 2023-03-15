module.exports = function makeDeleteUserUseCase({ usersDb }) {
  return async function deleteUserUsecase({ id }) {
    console.info(`Inside delete user use case`);
    await usersDb.deleteUser({ id });
  };
};

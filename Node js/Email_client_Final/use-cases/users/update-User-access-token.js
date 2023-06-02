module.exports = function makeupdateUserAccesToken({ usersDb }) {
  return async function updateUserAccesToken({
    user_id,
    access_token,
    expiry_date,
    database_name,
  }) {
    console.info(`Inside update user Access token use case`);
    try {
      const result = await usersDb.updateUserAccesToken({
        user_id,
        access_token,
        expiry_date,
        database_name,
      });
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};

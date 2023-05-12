module.exports = function makegetAllRelatedUser({ Joi,
    usersDb 
}) {
    return async function getAllRelatedUser({ current_time, database_name }) {
        console.info(`Inside getAllRelatedUser use case`);
        try {
            const result = await usersDb.getAllDbRelatedUser({ current_time, database_name });
            console.log(result)
            return result;
        } catch (err) {
            console.error(err);
            throw err;
          }
        };
      };
      
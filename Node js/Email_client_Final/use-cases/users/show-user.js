module.exports = function makeCreateUserUseCase({
    usersDb,
}){
    return async function showUserUsecase(database_name) {
        try{
            const users=await usersDb.showUser(database_name);
            console.info("show user under use case")
            return users;
        }
        catch(err)
        {
            console.error(err);
            throw err;
        }
    };
};
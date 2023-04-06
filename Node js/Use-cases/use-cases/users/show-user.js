module.exports = function makeCreateUserUseCase({
    usersDb,
}){
    return async function showUserUsecase({}) {
        try{
            const users=await usersDb.showUser({});
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
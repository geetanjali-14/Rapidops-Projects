module.exports = function makeCreateUserUseCase({
    usersDb,
}){
    return async function showUserUsecase({}) {
        try{
            const users=await usersDb.showUser({});
            console.log("show user under use case")
            return users;
        }
        catch(err)
        {
            console.log(err);
            throw err;
        }
    };
};
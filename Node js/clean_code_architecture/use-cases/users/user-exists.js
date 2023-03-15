module.exports = function makeUserExistUseCase({
    usersDb,
}){
    return async function userExistUsecase({id}){
        console.log(id)
        try{
            const result = await usersDb.userExists({id});
            return result;
        }
        catch(e){
            console.log(e);
            throw e;
        }
    }
}
module.exports = function makeCreateUserUseCase({
    usersDb,
}){
    return async function createUserUsecase({}) {
        console.info(`Inside create user use case`);
        await usersDb.createUser({});
        return true;
    }

}
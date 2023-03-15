module.exports = function makeCreateUserUseCase({
    usersDb,
}){
    return async function updateUserUsecase({id,name}) {
        console.info(`Inside update user use case`);
            await usersDb.updateUser({id,name});
    }
}
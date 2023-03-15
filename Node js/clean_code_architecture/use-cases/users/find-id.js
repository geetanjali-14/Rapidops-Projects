module.exports = function makeFindIdUserUseCase({
    usersDb,
}){
    return async function findId({email}){
        console.info("Inside find id use case");
        const id = await usersDb.findId({email});
        return id;
    }
}
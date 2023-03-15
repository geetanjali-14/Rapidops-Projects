function makeCreateUserUsecase(methods)
{
    return async function createUserUsecase()
    {
        console.log("create user usecase")
        methods.userDbMethods.createUser()
    }
}
module.exports = makeCreateUserUsecase;
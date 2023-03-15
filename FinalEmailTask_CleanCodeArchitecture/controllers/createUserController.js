function makeCreateUserController({createUserUsecase})
{
    return async function createUserController(req,res){
        console.log("create user controller")
        createUserUsecase()
        res.send("Working..........")
        
    }
}
module.exports = makeCreateUserController;
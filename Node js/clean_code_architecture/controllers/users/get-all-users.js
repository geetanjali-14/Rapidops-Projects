module.exports = function makeShowUserController({
    Joi,
    showUser,
}) {
    return async function showUserController(req, res){
        try{
            const users=await showUser({});
            console.log("show user under user controller.")
            return res.status(200).json({
                status:"success",
                message:users,
            });
        }
        catch(err)
        {
            res.status(500).json({
                status:'Error',
                messege:'Error'+err
            })
        }
    }
}
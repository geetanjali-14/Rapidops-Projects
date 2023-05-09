module.exports = function makeShowUserController({
    showUser,
}) {
    return async function showUserController(req, res){
        try{
            const database_name=req.headers['database_name'];
            const users=await showUser(database_name);
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
                messege:err.message
            })
        }
    }
}
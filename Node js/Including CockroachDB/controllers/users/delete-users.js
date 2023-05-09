module.exports = function makeDeleteUserController({
    Joi,
    deleteUser,
    userExists,
}) {
    return async function deleteUserController(req, res){

        console.info(`In delete user controller`, req.params);
        try{

            validInput(req.params);
            const id=req.params.id;

            const database_name = req.headers["database_name"];

            const ans=await userExists({id,database_name});
            console.log(ans);

            if(ans)
            {
                const deleteduserDetails= await deleteUser({id,database_name});
                res.status(201).json({
                    status:'Success',
                    messege:'User Deleted'
                })
                console.log(deleteduserDetails);
                return (deleteduserDetails);
            }
            else
            {
                console.log("User dosen't Exists");
                res.status(201).json({
                    status:'Success',
                    messege:'User not exists'
                })
            }
        }
        catch(err)
        {
            res.status(500).json({
                status:'Error',
                messege:err.message
            })
        }
    }
    function validInput(params)
        {
            const schema = Joi.object().keys({
            id: Joi.number().integer().required()
            })
            const {error}=schema.validate(params);
            if(error)
            {
                console.log(error);
                throw new Error(`${error.details[0].message}`);
            }
        }
}
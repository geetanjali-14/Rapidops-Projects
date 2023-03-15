module.exports = function makeDeleteUserController({
    Joi,
    deleteUser,
    userExists
}) {
    return async function deleteUserController(req, res){

        console.info(`In delete user controller`, req.params);
        try{

            validInput(req.params);
            const id=req.params.id;

            const ans=await userExists({id});
            console.log(ans);

            if(ans==1)
            {
                await deleteUser({id});
                res.status(201).json({
                    status:'Success',
                    messege:'User Deleted'
                })
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
                messege:'Error'+err
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
                throw error.details[0].message;
            }
        }
}
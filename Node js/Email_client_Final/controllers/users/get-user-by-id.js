module.exports = function makeGetUserByIdController({
    Joi,
    getUserById,
    userExists,
}) {
    return async function getUserByIdController(req, res){
        console.info(`In get user by id controller`, req.params);
        try{

            validInput(req.params);
            const id=req.params.id;
            const database_name = req.headers["database_name"];

            const ans=await userExists({id,database_name});
            console.log(ans);

            if(ans)
            {
                const [result]=await getUserById({id,database_name});
                console.log([result]);
                res.status(201).json({
                status:'Success',
                message:result
                })
            }
            else
            {
                console.log("User dosen't Exists");
                res.status(201).json({
                    status:'Success',
                    messege:'User dosen\'t Exists'
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
                throw error.details[0].message;
            }
        }
}
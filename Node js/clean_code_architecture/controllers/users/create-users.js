module.exports = function makeCreateUserController({
    Joi,
    createUser,
    defaultFolders,
    findId,
}) {
    return async function createUserController(req, res){

        console.info(`In create user controller`, req.body);
        try{
            validInput(req.body);
            const name=req.body.name;
            const email=req.body.email;
            const password=req.body.password;
            
            await createUser({name,email,password});
            const id = await findId({email:req.body.email});
            await defaultFolders({id});
            console.log("ID inside default folders ",id);
            res.status(201).json({
                status:'Success',
                message:"User Created"
            })
        }
        catch(err)
        {
            res.status(500).json({
                status:'Error',
                messege:"Error"
            })
        }
        }
        function validInput(body)
        {
            const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            })
            const {error}=schema.validate(body);
            if(error)
            {
                // console.log(error);
                throw error.details[0].message;
            }
        }
    }
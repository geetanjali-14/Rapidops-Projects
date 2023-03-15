module.exports = function makeUpdateUserController({
    Joi,
    updateUser,
}) {
    return async function updateUserController(req, res){

        console.info(`In update user controller`, req.params,req.body);
        try{
                const id=req.params.id
                const name=req.body.name
                await updateUser({id,name});
                res.status(201).json({
                    status:'Success',
                    messege:'User updated'
                })
        }
        catch(err)
        {
            res.status(500).json({
                status:'Error',
                messege:'Error '+err
            })
        }
        }
      }
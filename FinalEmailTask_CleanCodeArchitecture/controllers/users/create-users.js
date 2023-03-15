module.exports = function makeCreateUserController({
    Joi,
    createUser,
}) {
    return async function createUserController(req, res){

        console.info(`In create user controller`, req.body);
        // Joi.validate();
        await createUser({});
        res.send('');
    }
}
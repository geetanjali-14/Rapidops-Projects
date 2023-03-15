
function makeUserDbMethods({connection}){
    return Object.freeze({
        createUser
    })
    async function createUser({}){
        console.log("Create user") 
        
        const [result] = await connection.query(`select * from User;`);
        console.log("User Created");
        return true;
    }    
}
module.exports =  makeUserDbMethods;
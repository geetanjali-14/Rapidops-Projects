// console.log("user use case index.js")
const users_table="Users";
function makeUserDbMethods({connection}){
    return Object.freeze({
        userExists,
        createUser,
        showUser,
        deleteUser,
        getUserById,
        updateUser,
        defaultFolders,
        findId,
    })
    async function userExists({id}){
        console.log("User's existence check");
        try{
            const [result]=await connection.query(`select count (*) as row from ${users_table} where user_id=?`,[id]);
            console.log(result[0].row);
            return (result[0].row);
        }
        catch(err)
        {
            throw err;
        }
    }  

    async function createUser({name,email,password}){
        console.log("Create user");
        try{
            await connection.query(`INSERT INTO ${users_table} (name,email,password) VALUES (?,?,?);`, [name,email,password]);
            console.log("User Created:");
        }
        catch(err) 
        {
            throw err;
        }
    }    
    async function showUser({}){
        console.log("Show user");
        try{
            const [result] = await connection.query(`select * from ${users_table};`);
            console.log(result)
            return result;
        }
        catch(err)
        {
            throw err;
        }
        
    }
    async function deleteUser({id}){
        console.log("delete user");
        try{
            await connection.query(`DELETE FROM ${users_table} WHERE user_id = ?;`,[id]);
            
        }
        catch(err)
        {
            throw err;
        }
    }
    async function updateUser({id,name}){
        console.log("update user");
        console.log(id,name);
        try{
            await connection.query(`update Users set name = ? where user_id=?`, [name,id]);
            console.log("User updated");
        }
        catch(err)
        {
            throw err;
        }
    }    
    async function getUserById({id}){
        try{
            const [result] = await connection.query(`select * from ${users_table} where user_id=?;`,[id]);
            console.log(result)
            return result;
        }
        catch(err)
        {
            throw err;
        }
    }

    async function defaultFolders({id}){
        console.log("Inside default folder data-access");
        const folders = ['inbox','outbox','trash','archieve','trash'];
        try{
        for(let i in folders){
            const [result] = await connection.query(
                `insert into Folder (user_id,name) values (?,?)`,[id,folders[i]]
            );
        }
    }
        catch(err){
            console.log(err)
    }
    }

    async function findId({email}){
        console.log("FindIdDb in data-access");
        console.log({email});
        try{
            const [result] = await connection.query(`select user_id from ${users_table} where email=?`,[email]);
            return result[0].user_id;
        }
        catch(err){
            console.log(err)
        }
    }

}
module.exports =  makeUserDbMethods;
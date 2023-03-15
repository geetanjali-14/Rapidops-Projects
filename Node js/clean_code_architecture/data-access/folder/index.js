// console.log("folder data index index.js")

const folder_table="Folder";
function makeFolderDbMethods({connection}){
    return Object.freeze({
        updateFolder,
        deleteFolder,
        getFolderById,
        createFolder,
        folderExists,
    })
    
    async function folderExists({user_id,name}){
        console.log("Folder existence check");
        try{
            const [result]=await connection.query(`select count (*) as row from ${folder_table} where user_id=? and name=?`,[user_id,name]);
            console.log(result[0].row);
            return (result[0].row);
        }
        catch(err)
        {
            throw err;
        }
    }    
    async function createFolder({id,name}){
        console.log("Create folder data access");
        try{
            await connection.query(`INSERT INTO ${folder_table} (name,folder_id) VALUES (?,?);`, [name,id]);
            console.log("Folder Created");
        }
        catch(err)
        {
            throw err;
        }
    }    
    async function getFolderById({id}){
        try{
            const [result] = await connection.query(`select name from ${folder_table} where user_id=? ;`,[id]);
            console.log(result)
            return result;
        }
        catch(err)
        {
            throw err;
        }
    }

async function updateFolder({folder_id,name}){
    console.log("update folder");
    try{
        await connection.query(`update ${folder_table} set name = ? where folder_id=?`, [name,folder_id]);
        console.log("Folder updated");
    }
    catch(err)
    {
        console.log(err);
    }
}    
async function deleteFolder({id}){
    console.log("delete folder");
    try{
        const [result] = await connection.query(`DELETE FROM ${folder_table} WHERE folder_id = ?;`,[id]);
        console.log(result)
        return result;
    }
    catch(err)
    {
        console.log(err);
    }
}
}
module.exports =  makeFolderDbMethods;
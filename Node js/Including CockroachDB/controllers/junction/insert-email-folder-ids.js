// module.exports=function makeEmailFolderJunctionController({
//     insertEmailFolderId,
// })
// {
//     return async function  insertEmailFolderID(req,res)
//     {
//       console.info(`In email folder junction controller`, req.body);
//         try{
//             const user_id=req.body.user_id;
//             const database_name = req.headers["database_name"];

//             await insertEmailFolderId({user_id,database_name})
//         }
//         catch (err) {
//             res.status(500).json({
//               status: "Error",
//               messege: err.messege,
//             });
//           }
//     }
// }
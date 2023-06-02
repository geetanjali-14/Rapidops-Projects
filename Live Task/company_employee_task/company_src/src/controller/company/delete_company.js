module.exports = function makeDeleteCompanyController({
    Joi,
    deleteCompany,
    deleteEmployeeOfDeletedCompany,
    companyExists,
}) {
    return async function deleteCompanyController(req, res){

        console.info(`In delete company controller`, req.params);
        try{

            validInput(req.params);
            const company_id=req.params.company_id;

            const database_name = req.headers["database_name"];

            const company_id_exists=await companyExists({company_id,database_name});
            console.log(company_id_exists);

            if(company_id_exists)
            {
                await deleteCompany({company_id,database_name});

                const result = await deleteEmployeeOfDeletedCompany({company_id});
                if(result)
                {
                    console.info('Employees of company Also deleted.')
                    res.status(201).json({
                        status:'Success',
                        messege:'Company Deleted'
                    })
                }
            }
            else
            {
                console.log("Company ID dosen't Exists");
                res.status(201).json({
                    status:'Success',
                    messege:'Company not exists'
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
                company_id: Joi.number().integer().required()
            })
            const {error}=schema.validate(params);
            if(error)
            {
                console.log(error);
                throw new Error(`${error.details[0].message}`);
            }
        }
}
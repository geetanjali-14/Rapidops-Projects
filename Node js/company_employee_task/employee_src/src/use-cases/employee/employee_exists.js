module.exports = function makeEmployeeExistsUseCase({
    Joi,
    employeeDB,
  }){
      return async function employeeExistsUsecase({employee_id,database_name}){
          console.info(employee_id)
          validateInput({employee_id});
          try{
              const result = await employeeDB.employeeExists({employee_id,database_name});
              return result;
          }
          catch(e){
              console.error(e);
              throw e;
          }
      }
      function validateInput({employee_id}) {
          const schema = Joi.object({
            employee_id: Joi.number().required().messages({
              'number.base':'"id" must be a number',
            }),
          });
      
          const {error} = schema.validate({employee_id});
          if (error) {
            console.error(error)
            throw new Error(`${error.details[0].message}`);
          }
        }
  }
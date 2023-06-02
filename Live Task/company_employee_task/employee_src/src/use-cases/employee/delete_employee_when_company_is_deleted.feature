Feature: Deleting Employee when its company is deleted.

    Scenario Outline: Try to delete employee when its company is deleted with invalid details, then it will throw error.
        Given Delete employee having company_id: "<company_id>" and database_name:"<database_name>" when company is deleted
        When Try to delete employee when company is deleted
        Then It will throw error: "<error>" with message: "<message>" while deleting employee when company is deleted
        And deleteEmployeeOfDeletedCompany function will call <deleteEmployeeOfDeletedCompanyFunctionCallCount> time while deleting employee of deleted company
        And companyExistsById function will call <companyExistsByIdCallCountcompanyExistsByIdCallCount> while deleting employee of deleted company

        companyExistsByIdCallCount
        Examples:companyExistsByIdCallCount
            | company_id | database_name | deleteEmployeeOfDeletedCompanyFunctionCallCount | companyExistsByIdCallCount | error           | message                              |
            |            |               | 0                                               | 0                          | ValidationError | '"company_id" is required'           |
            | 2          |               | 0                                               | 0                          | ValidationError | '"database_name" is required'        |
            | a          |               | 0                                               | 0                          | ValidationError | "\"company_id\" must be a number"    |
            | 1          | 1             | 0                                               | 0                          | ValidationError | "\"database_name\" must be a string" |


    Scenario Outline:Try to delete employee of existing company, then it will throw error.
        Given Delete employee having company_id: "<company_id>" and database_name:"<database_name>" when company is deleted
        And Company Exists by id returns result is: <companyExistsDetails>
        When Try to delete employee when company is deleted
        Then It will throw error: "<error>" with message: "<message>" while deleting employee when company ID entered still exist
        And deleteEmployeeOfDeletedCompany function will call <deleteEmployeeOfDeletedCompanyFunctionCallCount> time while deleting employee of deleted company
        And companyExistsById function will call <companyExistsByIdCallCount> while deleting employee of deleted company


        Examples:
            | company_id | database_name | companyExistsDetails | deleteEmployeeOfDeletedCompanyFunctionCallCount | companyExistsByIdCallCount | error          | message                            |
            | 1          | employee      | 1                    | 0                                               | 1                          | ForbiddenError | "Company with this ID still exist" |



    Scenario Outline: Try to delete employee when its company is deleted with valid inputs.
        Given Delete employee having company_id: "<string>" and database_name:"<string>" when company is deleted
        And Company Exists by id returns result is: <companyExistsDetails>
        When Try to delete employee when company is deleted
        Then It will delete employee with details: "<deletedEmployeeDetails>" when company is deleted
        And deleteEmployeeOfDeletedCompany function will call <deleteEmployeeOfDeletedCompanyFunctionCallCount> time while deleting employee of deleted company
        And companyExistsById function will call <companyExistsByIdCallCount> time while deleting employee of deleted company

        Examples:
            | company_id | database_name | companyExistsDetails | deletedEmployeeDetails |  | deleteEmployeeOfDeletedCompanyFunctionCallCount | companyExistsByIdCallCount |
            | 2          | employee      | 1                    | '{"employee_id": 1}'   |  | 1                                               | 1                          |

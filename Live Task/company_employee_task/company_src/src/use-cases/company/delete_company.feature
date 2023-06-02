Feature: Deleting company.

    Scenario Outline: Try to delete company with invalid details, then it will throw error.
        Given Delete company having company_id: "<company_id>" and database_name:"<database_name>"
        When Try to delete company
        Then It will throw error: "<error>" with message: "<message>" while deleting company
        And deletecompany function will call <deletecompanyFunctionCallCount> time while deleting company
        And companyExists function will call <companyExistsByIdCallCount> time while deleting company
        Examples:
            | company_id | database_name | deletecompanyFunctionCallCount | companyExistsByIdCallCount | error           | message                              |
            |            |               | 0                              | 0                          | ValidationError | '"company_id" is required'           |
            | 2          |               | 0                              | 0                          | ValidationError | '"database_name" is required'        |
            | a          |               | 0                              | 0                          | ValidationError | "\"company_id\" must be a number"    |
            | 1          | 1             | 0                              | 0                          | ValidationError | "\"database_name\" must be a string" |


    Scenario Outline:Try to delete company of non existing company_id, then it will throw error.
        Given Delete company having company_id: "<company_id>" and database_name:"<database_name>"
        And Company Exists by id returns result is: <companyExistsDetails>
        When Try to delete company
        Then It will throw error: "<error>" with message: "<message>" while deleting company
        And deletecompany function will call <deletecompanyFunctionCallCount> time while deleting company
        And companyExists function will call <companyExistsByIdCallCount> time while deleting company
        Examples:
            | company_id | database_name | deletecompanyFunctionCallCount | error          | companyExistsByIdCallCount | message                           |
            | 1          | company       | 0                              | ForbiddenError | 1                          | "company Entered Dose not exists" |


    Scenario Outline: Try to delete company with valid inputs.
        Given Delete company having company_id: "<string>" and database_name:"<string>" when company is deleted
        When Try to delete company
        Then It will delete company with result: "<deleteStatus>"
        And deletecompany function will call <deletecompanyFunctionCallCount> time while deleting company
        And companyExists function will call <companyExistsByIdCallCount> time while deleting company
        Examples:
            | company_id | database_name | deleteStatus | deletecompanyFunctionCallCount | companyExistsByIdCallCount |
            | 2          | company       | '1'          | 1                              | 1                          |

Feature: Checking company's Existence.

    Scenario Outline: Try to check company's existence with invalid details, then it will throw error.
        Given Checking company existence having company_id: "<company_id>" and database_name:"<database_name>"
        When Try to check company existence
        Then It will throw error: "<error>" with message: "<message>" while checking company existence
        And companyExists function will call <companyExistsFunctionCallCount> time while checking company existence

        Examples:
            | company_id | database_name | companyExistsFunctionCallCount | error | message                              |
            |             |               | 0                               | Error | '"company_id" is required'          |
            | 2           |               | 0                               | Error | '"database_name" is required'        |
            | a           |               | 0                               | Error | "\"company_id\" must be a number"   |
            | 1           | 1             | 0                               | Error | "\"database_name\" must be a string" |


    Scenario Outline:Try to check company's existence of non existing company_id, then it will throw error.
        Given Checking company existence having company_id: "<company_id>" and database_name:"<database_name>"
        When Try to check company existence
        Then It will throw error: "<error>" with message: "<message>" while checking company existence
        And companyExists function will call <companyExistsFunctionCallCount> time while checking company existence

        Examples:
            | company_id | database_name | companyExistsFunctionCallCount | error | message                                |
            | 1           | company      | 0                               | Error | "company with this ID does not exist" |


    Scenario Outline: Try to delete company with valid inputs.
        Given Checking company existence having company_id: "<string>" and database_name:"<string>" when company is deleted
        When Try to check company existence
        Then It will check company existence with result: "{string}"
        And companyExists function will call <companyExistsFunctionCallCount> time while checking company existence

        Examples:
            | company_id | database_name | existenceStatus | companyExistsFunctionCallCount |
            | 2           | company      | '1'             | 1                               |

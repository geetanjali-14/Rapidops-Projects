Feature: Try to get Company Email by Company Id
    Scenario Outline:Try to get company email with company id with invalid details, then it will throw error.
        Given Get employee having company_name: "<company_name>" and database_name:"<database_name>"
        When Try to get Company Email by Company Id
        Then It will throw error: "<error>" with message: "<message>" while while getting employee
        And getCompanyEmailbyCompanyId function will call <getCompanyEmailbyCompanyIdFunctionCallCount> time while getting company email by company Id
        Examples:
            | company_id | getCompanyEmailbyCompanyIdFunctionCallCount | error           | message                         |
            |            | 0                                           | ValidationError | '"company_id" is required'      |
            | 1          | 0                                           | ValidationError | '"company_id" must be a string' |


    Scenario Outline: Try to get employee with company Name with valid inputs.
        Given Get employee having company_name: "<string>" and database_name:"<string>" when getting company email by company Id
        When Try to get Company Email by Company Id
        Then It will Try to get Company Email by Company Id with result: <emailSent>
        And getCompanyEmailbyCompanyId function will call <getCompanyEmailbyCompanyIdFunctionCallCount> time while getting company email by company Id

        Examples:
            | company_id | emailSent | getCompanyEmailbyCompanyIdFunctionCallCount |
            | 1          | 1         | 1                                           |

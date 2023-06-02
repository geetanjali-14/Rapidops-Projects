Feature: Getting Employee by Company Name.

    Scenario Outline: Try to get employee with company Name with invalid details, then it will throw error.
        Given Get employee having company_name: "<company_name>" and database_name:"<database_name>"
        When Try to get employee by company_name
        Then It will throw error: "<error>" with message: "<message>" while while getting employee
        And getEmployeesByCompanyName function will call <getEmployeesByCompanyNameFunctionCallCount> time while getting employees
        Examples:
            | company_name | database_name | getEmployeesByCompanyNameFunctionCallCount | error           | message                              |
            |              |               | 0                                          | ValidationError | '"company_name" is required'         |
            | rapidops     |               | 0                                          | ValidationError | '"database_name" is required'        |
            | 1            |               | 0                                          | ValidationError | '"company_name" must be a string'    |
            | rapidops     | 1             | 0                                          | ValidationError | "\"database_name\" must be a string" |


    Scenario Outline: Try to get employee of non existing company name, then it will throw error.
        Given Get employee having company_name: "<company_name>" and database_name:"<database_name>"
        When Try to get employee by company_name
        Then It will throw error: "<error>" with message: "<message>" while while getting employee
        And getEmployeesByCompanyName function will call <getEmployeesByCompanyNameFunctionCallCount> time while getting employees
        Examples:
            | company_name | database_name | getEmployeesByCompanyNameFunctionCallCount | error          | message                                 |
            | rapidops     | employee      | 0                                          | ForbiddenError | "Company with this name does not exist" |


    Scenario Outline: Try to get employee with company Name with valid inputs.
        Given Get employee having company_name: "<string>" and database_name:"<string>" when company is deleted
        When Try to get employee by company_name
        Then It will give employees of company with result: "<employeeDetails>"
        And getEmployeesByCompanyName function will call <getEmployeesByCompanyNameFunctionCallCount> time while getting employees

        Examples:
            | company_name | database_name | employeeDetails      | getEmployeesByCompanyNameFunctionCallCount |
            | Rapidops     | employee      | '{"employee_id": 1}' | 1                                          |

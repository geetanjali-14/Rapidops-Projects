Feature: Create New Employee

    Scenario Outline: Try to create new employee with empty details, then it will throw error.
        Given Employee details employee_name: "<employee_name>", role: "<role>", company_id: "<company_id>", company_name: "<company_name>" and database_name: "<database_name>" to create new employee
        When Try to create new employee
        Then It will throw error: "<error>" with message: "<message>" while creating new employee with empty fields
        And createEmployee function will call <createEmployeeFunctionCallCount> time while creating new employee
        And companyExists function will call <companyExistsCallCount> time while creating new employee

        Examples:
            | employee_name | role   | company_id | company_name | database_name | createEmployeeFunctionCallCount | companyExistsCallCount | error           | message                       |
            |               |        |            |              |               | 0                               | 0                      | ValidationError | '"employee_name" is required' |
            | Geetanjali    |        |            |              |               | 0                               | 0                      | ValidationError | '"role" is required'          |
            | Geetanjali    | Intern |            |              |               | 0                               | 0                      | ValidationError | '"company_id" is required'    |
            | Geetanjali    | Intern | 2          |              |               | 0                               | 0                      | ValidationError | '"company_name" is required'  |
            | Geetanjali    | Intern | 2          | Rapidops     |               | 0                               | 0                      | ValidationError | '"database_name" is required' |

    Scenario Outline: Try to create new employee with invalid details, then it will throw error.
        Given Employee details employee_name: "<employee_name>", role: "<role>", company_id: "<company_id>", company_name: "<company_name>" and database_name: "<database_name>" to create new employee
        When Try to create new employee
        Then It will throw error: "<error>" with message: "<message>" while creating new employee with wrong fields
        And createEmployee function will call <createEmployeeFunctionCallCount> time while creating new employee
        And companyExists function will call <companyExistsCallCount> time while creating new employee

        Examples:
            | employee_name | role   | company_id | company_name | database_name | createEmployeeFunctionCallCount | companyExistsCallCount | error           | message                            |
            | 21            | Intern | 2          | Rapidops     | employee      | 0                               | 0                      | ValidationError | '"employee_name" must be a string' |
            | Geetanjali    | 3      | 2          | Rapidops     | employee      | 0                               | 0                      | ValidationError | '"role" must be a string'          |
            | Geetanjali    | Intern | a          | Rapidops     | employee      | 0                               | 0                      | ValidationError | '"company_id" must be a number'    |
            | Geetanjali    | Intern | 2          | 1            | employee      | 0                               | 0                      | ValidationError | '"company_name" must be a string'  |
            | Geetanjali    | Intern | 2          | Rapidops     | 4             | 0                               | 0                      | ValidationError | '"database_name" must be a string' |


    Scenario Outline: Try to create new employee with non-existing company, then it will throw error.
        Given Employee details employee_name: "<employee_name>", role: "<role>", company_id: "<company_id>", company_name: "<company_name>" and database_name: "<database_name>" to create new employee
        And Company Exists returns result is: <companyExistsDetails>
        When Try to create new employee
        Then It will throw error: "<error>" with message: "<message>" while creating new employee when company entered does not exist
        And createEmployee function will call <createEmployeeFunctionCallCount> time while creating new employee
        And companyExists function will call <companyExistsCallCount> time while creating new employee

        Examples:
            | employee_name | role   | company_id | company_name | database_name | companyExistsDetails | createEmployeeFunctionCallCount | companyExistsCallCount | error          | message                                 |
            | Geetanjali    | Intern | 2          | asdo         | employee      | 0                    | 0                               | 1                      | ForbiddenError | "Company with this name does not exist" |


    Scenario Outline: Try to create new employee with valid inputs
        Given Employee details employee_name: "<employee_name>", role: "<role>", company_id: "<company_id>", company_name: "<company_name>" and database_name: "<database_name>" to create new employee
        And Company Exists returns result is: <companyExistsDetails>
        When Try to create new employee
        Then It will create new employee with details: "<newEmployeeDetails>"
        And createEmployee function will call <createEmployeeFunctionCallCount> time while creating new employee
        And companyExists function will call <companyExistsCallCount> time while creating new employee

        Examples:
            | employee_name | role   | company_id | company_name | database_name | companyExistsDetails | newEmployeeDetails | createEmployeeFunctionCallCount | companyExistsCallCount |
            | Geetanjali    | Intern | 2          | Rapidops     | employee      | 1                    | {"employee_id": 1} | 1                               | 1                      |

Feature: Deleting Employee.

    Scenario Outline: Try to delete employee with invalid details, then it will throw error.
        Given Delete employee having employee_id: "<employee_id>" and database_name:"<database_name>"
        When Try to delete employee
        Then It will throw error: "<error>" with message: "<message>" while deleting employee
        And deleteEmployee function will call <deleteEmployeeFunctionCallCount> time while deleting employee
        And companyExists function will call <companyExistsByIdCallCount> time while deleting employee
        Examples:
            | employee_id | database_name | deleteEmployeeFunctionCallCount | companyExistsByIdCallCount | error           | message                              |
            |             |               | 0                               | 0                          | ValidationError | '"employee_id" is required'          |
            | 2           |               | 0                               | 0                          | ValidationError | '"database_name" is required'        |
            | a           |               | 0                               | 0                          | ValidationError | "\"employee_id\" must be a number"   |
            | 1           | 1             | 0                               | 0                          | ValidationError | "\"database_name\" must be a string" |


    Scenario Outline:Try to delete employee of non existing employee_id, then it will throw error.
        Given Delete employee having employee_id: "<employee_id>" and database_name:"<database_name>"
        And Company Exists by id returns result is: <companyExistsDetails>
        When Try to delete employee
        Then It will throw error: "<error>" with message: "<message>" while deleting employee
        And deleteEmployee function will call <deleteEmployeeFunctionCallCount> time while deleting employee
        And companyExists function will call <companyExistsByIdCallCount> time while deleting employee
        Examples:
            | employee_id | database_name | deleteEmployeeFunctionCallCount | error          | companyExistsByIdCallCount | message                            |
            | 1           | employee      | 0                               | ForbiddenError | 1                          | "Employee Entered Dose not exists" |


    Scenario Outline: Try to delete employee with valid inputs.
        Given Delete employee having employee_id: "<string>" and database_name:"<string>" when company is deleted
        When Try to delete employee
        Then It will delete employee with result: "<deleteStatus>"
        And deleteEmployee function will call <deleteEmployeeFunctionCallCount> time while deleting employee
        And companyExists function will call <companyExistsByIdCallCount> time while deleting employee
        Examples:
            | employee_id | database_name | deleteStatus | deleteEmployeeFunctionCallCount | companyExistsByIdCallCount |
            | 2           | employee      | '1'          | 1                               | 1                          |

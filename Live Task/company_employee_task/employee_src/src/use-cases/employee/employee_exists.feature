Feature: Checking Employee's Existence.

    Scenario Outline: Try to check employee's existence with invalid details, then it will throw error.
        Given Checking employee existence having employee_id: "<employee_id>" and database_name:"<database_name>"
        When Try to check employee existence
        Then It will throw error: "<error>" with message: "<message>" while checking employee existence
        And employeeExists function will call <employeeExistsFunctionCallCount> time while checking employee existence

        Examples:
            | employee_id | database_name | employeeExistsFunctionCallCount | error | message                              |
            |             |               | 0                               | Error | '"employee_id" is required'          |
            | 2           |               | 0                               | Error | '"database_name" is required'        |
            | a           |               | 0                               | Error | "\"employee_id\" must be a number"   |
            | 1           | 1             | 0                               | Error | "\"database_name\" must be a string" |


    Scenario Outline:Try to check employee's existence of non existing employee_id, then it will throw error.
        Given Checking employee existence having employee_id: "<employee_id>" and database_name:"<database_name>"
        When Try to check employee existence
        Then It will throw error: "<error>" with message: "<message>" while checking employee existence
        And employeeExists function will call <employeeExistsFunctionCallCount> time while checking employee existence

        Examples:
            | employee_id | database_name | employeeExistsFunctionCallCount | error | message                                |
            | 1           | employee      | 0                               | Error | "Employee with this ID does not exist" |


    Scenario Outline: Try to delete employee with valid inputs.
        Given Checking employee existence having employee_id: "<string>" and database_name:"<string>" when company is deleted
        When Try to check employee existence
        Then It will check employee existence with result: "{string}"
        And employeeExists function will call <employeeExistsFunctionCallCount> time while checking employee existence

        Examples:
            | employee_id | database_name | existenceStatus | employeeExistsFunctionCallCount |
            | 2           | employee      | '1'             | 1                               |

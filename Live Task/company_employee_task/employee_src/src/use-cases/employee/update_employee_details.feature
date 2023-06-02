Feature: Updating Employee.

    Scenario Outline: Try to update employee with empty fields, then it will throw error.
        Given Updating Employee details employee_id: "<employee_id>", employee_name: "<employee_name>", role: "<role>", company_id: "<company_id>", company_name: "<company_name>" and database_name: "<database_name>"
        When Try to update employee
        Then It will throw error: "<error>" with message: "<message>" while updating employee with empty fields
        And updateEmployee function will call <updateEmployeeFunctionCallCount> time while updating employee

        Examples:
            | employee_id | employee_name | role   | company_id | company_name | database_name | updateEmployeeFunctionCallCount | error           | message                       |
            |             |               |        |            |              |               | 0                               | ValidationError | '"employee_id" is required'   |
            | 1           |               |        |            |              |               | 0                               | ValidationError | '"employee_name" is required' |
            | 1           | Geetanjali    |        |            |              |               | 0                               | ValidationError | '"role" is required'          |
            | 1           | Geetanjali    | Intern |            |              |               | 0                               | ValidationError | '"company_id" is required'    |
            | 1           | Geetanjali    | Intern | 2          |              |               | 0                               | ValidationError | '"company_name" is required'  |
            | 1           | Geetanjali    | Intern | 2          | Rapidops     |               | 0                               | ValidationError | '"database_name" is required' |

    Scenario Outline: Try to update employee with invalid details, then it will throw error.
        Given Updating Employee details employee_id: "<employee_id>", employee_name: "<employee_name>", role: "<role>", company_id: "<company_id>", company_name: "<company_name>" and database_name: "<database_name>"
        When Try to update employee
        Then It will throw error: "<error>" with message: "<message>" while updating employee with wrong fields
        And updateEmployee function will call <updateEmployeeFunctionCallCount> time while updating employee

        Examples:
            | employee_id | employee_name | role   | company_id | company_name | database_name | updateEmployeeFunctionCallCount | error           | message                            |
            | a           | Geetanjali    | Intern | 1          | Rapidops     | employee      | 0                               | ValidationError | '"employee_id" must be a number'   |
            | a           | 1             | Intern | 1          | Rapidops     | employee      | 0                               | ValidationError | '"employee_name" must be a string' |
            | a           | Geetanjali    | 2      | 1          | Rapidops     | employee      | 0                               | ValidationError | '"role" must be a string'          |
            | a           | Geetanjali    | Intern | a          | Rapidops     | employee      | 0                               | ValidationError | '"company_id" must be a number'    |
            | a           | Geetanjali    | Intern | 1          | 4            | employee      | 0                               | ValidationError | '"company_name" must be a string'  |
            | a           | Geetanjali    | Intern | 1          | Rapidops     | 5             | 0                               | ValidationError | '"database_name" must be a string' |


    Scenario Outline: Try to update employee non-existing company_name, then it will throw error.
        Given Updating Employee details employee_id: "<employee_id>", employee_name: "<employee_name>", role: "<role>", company_id: "<company_id>", company_name: "<company_name>" and database_name: "<database_name>"
        When Try to update employee
        Then It will throw error: "<error>" with message: "<message>" while updating employee with wrong fields
        And updateEmployee function will call <updateEmployeeFunctionCallCount> time while updating employee

        Examples:
            | employee_id | employee_name | role   | company_id | company_name | database_name | updateEmployeeFunctionCallCount | error          | message                            |
            | a           | Geetanjali    | Intern | 1          | Rapidops     | employee      | 0                               | ForbiddenError | "Employee Entered Dose not exists" |


    Scenario Outline: Try to update employee with valid inputs.
        Given Updating Employee details employee_id: "<employee_id>", employee_name: "<employee_name>", role: "<role>", company_id: "<company_id>", company_name: "<company_name>" and database_name: "<database_name>"
        When Try to update employee
        Then It will update employee with details: "<UpdateDetails>"
        And updateEmployee function will call <updateEmployeeFunctionCallCount> time while updating employee

        Examples:
            | employee_id | employee_name | role   | company_id | company_name | database_name | UpdateDetails | updateEmployeeFunctionCallCount |
            | 1           | Geetanjali    | Intern | 2          | Rapidops     | employee      | 'true'        | 1                               |

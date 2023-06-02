Feature: Updating Employee when its company is updated.

    Scenario Outline: Try to update employee when its company is updated with invalid details, then it will throw error.
        Given Update employee details when company details changes having company_id: "<company_id>", company_name: "<company_name>" and database_name:"<database_name>" when company is updated
        When Try to update employee when company details changes
        Then It will throw error: "<error>" with message: "<message>" to update employee when company details changes
        And updateEmployeeWhenCompanyIsUpdated function will call <updateEmployeeWhenCompanyIsUpdatedFunctionCallCount> time to update employee when company details changes
        Examples:
            | company_id | company_name | database_name | updateEmployeeWhenCompanyIsUpdatedFunctionCallCount | error           | message                              |
            |            |              |               | 0                                                   | ValidationError | '"company_id" is required'           |
            | 1          |              |               | 0                                                   | ValidationError | '"company_name" is required'         |
            | 1          | rapidops     |               | 0                                                   | ValidationError | '"database_name" is required'        |
            | a          | rapidops     | employee      | 0                                                   | ValidationError | "\"company_id\" must be a number"    |
            | 1          | 1            | employee      | 0                                                   | ValidationError | '"company_name" must be a string'    |
            | 1          | rapidops     | 1             | 0                                                   | ValidationError | "\"database_name\" must be a string" |

    Scenario Outline: Try to update employee when its company is updated with invalid details, then it will throw error.
        Given Update employee details when company details changes having company_id: "<company_id>", company_name: "<company_name>" and database_name:"<database_name>" when company is updated
        When Try to update employee when company details changes
        Then It will throw error: "<error>" with message: "<message>" to update employee when company details changes
        And updateEmployeeWhenCompanyIsUpdated function will call <updateEmployeeWhenCompanyIsUpdatedFunctionCallCount> time to update employee when company details changes
        Examples:
            | company_id | company_name | database_name | updateEmployeeWhenCompanyIsUpdatedFunctionCallCount | error          | message                               |
            | 1          | rapidops     | employee      | 0                                                   | ForbiddenError | "Company with this ID does not exist" |


    Scenario Outline: Try to update employee when its company is updated with valid inputs.
        Given Update employee details when company details changes having company_id: "<company_id>", company_name: "<company_name>" and database_name:"<database_name>" when company is updated
        When Try to update employee when company details changes
        Then It will update employee when company details changes with details: "<updatedEmployeeDetails>"
        And updateEmployeeWhenCompanyIsUpdated function will call <updateEmployeeWhenCompanyIsUpdatedFunctionCallCount> time to update employee when company details changes

        Examples:
            | company_id | company_name | database_name | updatedEmployeeDetails | updateEmployeeWhenCompanyIsUpdatedFunctionCallCount |
            | 2          | Rapidops     | employee      | '{"employee_id": 1}'   | 1                                                   |

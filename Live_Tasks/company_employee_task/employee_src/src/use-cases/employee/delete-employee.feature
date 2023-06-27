Feature: Delete Employee

    Scenario Outline: Try to delete employee with empty details, then it will throw error.
        Given Employee details employeeId: "<employeeId>", accessToken: "<accessToken>" to delete employee
        When Try to delete employee
        Then It will throw error: "<error>" with message: "<message>" while deleting employee
        And deleteEmployee function will be called <deleteEmployeeFunctionCallCount> time while deleting employee

        Examples:
            | employeeId | accessToken | deleteEmployeeFunctionCallCount | error           | message                     |
            |            |             | 0                               | ValidationError | '"employeeId" is required'  |
            | 1          |             | 0                               | ValidationError | '"accessToken" is required' |

    Scenario Outline: Try to delete employee with valid inputs
        Given Employee details employeeId: "<employeeId>", accessToken: "<accessToken>" to delete employee
        When Try to delete employee
        Then It will delete employee with details: <deleteStatus>
        And deleteEmployee function will be called <deleteEmployeeFunctionCallCount> time while deleting employee

        Examples:
            | employeeId | accessToken        | deleteStatus | deleteEmployeeFunctionCallCount |
            | 1          | edfchech3487rnyxy4 | 1            | 1                               |
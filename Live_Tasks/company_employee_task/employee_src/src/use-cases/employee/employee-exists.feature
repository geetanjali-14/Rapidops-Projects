Feature: Checking employee existence

    Scenario Outline: Try to check employee existence with empty details, then it will throw error.
        Given Employee details employeeId: "<employeeId>" to check employee existence
        When Try to check employee existence
        Then It will throw error: "<error>" with message: "<message>" while checking employee existence
        And employeeExists function will call <employeeExistsFunctionCallCount> time while checking employee existence

        Examples:
            | employeeId | employeeExistsFunctionCallCount | error           | message                    |
            |            | 0                               | ValidationError | '"employeeId" is required' |

    Scenario Outline: Try to check employee existence with valid inputs
        Given Employee details employeeId: "<employeeId>" to check employee existence
        When Try to check employee existence
        Then It will check employee existence with details: <employeeExists>
        And employeeExists function will call <employeeExistsFunctionCallCount> time while checking employee existence

        Examples:
            | employeeId | employeeExists | employeeExistsFunctionCallCount |
            | 1          | 1           | 1                               |
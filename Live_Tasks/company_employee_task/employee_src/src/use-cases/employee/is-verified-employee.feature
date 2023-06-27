Feature: Verifying Employee

    Scenario Outline: Try to check employee verification with invalid details, then it will throw an error.
        Given Employee details employeeId: "<employeeId>" to check employee verification
        When Try to check employee verification
        Then It will throw error: "<error>" with message: "<message>" while try to check employee verification
        And isVerifiedEmployee function will call <isVerifiedEmployeeFunctionCallCount> time while try to to check employee verification

        Examples:
            | employeeId | isVerifiedEmployeeFunctionCallCount | error           | message                    |
            |            | 0                                   | ValidationError | '"employeeId" is required' |

    Scenario Outline: Try to check employee verification with valid inputs.
       Given Employee details employeeId: "<employeeId>" to check employee verification
        When Try to check employee verification
        Then It will check employee verification with details: <verificationDetails>
        And isVerifiedEmployee function will call <isVerifiedEmployeeFunctionCallCount> time while try to to check employee verification

        Examples:
            | employeeId | verificationDetails | isVerifiedEmployeeFunctionCallCount |
            | 2          | 1                | 1                                   |
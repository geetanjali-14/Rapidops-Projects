Feature: Checking Access token existence

    Scenario Outline: Try to check access token existence with empty details, then it will throw error.
        Given Access token exists employeeId: "<employeeId>" to check access token existence
        When To check access token existence
        Then It will throw error: "<error>" with message: "<message>" to check access token existence
        And accessTokenExists function will call <accessTokenExistsFunctionCallCount> time to check access token existence

        Examples:
            | employeeId | accessTokenExistsFunctionCallCount | error           | message                    |
            |            | 0                                  | ValidationError | '"employeeId" is required' |

    Scenario Outline: Try to check access token existence with valid inputs
        Given Access token exists employeeId: "<employeeId>" to check access token existence
        When To check access token existence
        Then It will check access token existence with details: <existenceStatus>
        And accessTokenExists function will call <accessTokenExistsFunctionCallCount> time to check access token existence

        Examples:
            | employeeId | existenceStatus | accessTokenExistsFunctionCallCount |
            | 1          | 1            | 1                                  |
Feature: Checking Access token existence

    Scenario Outline: Try to check access token existence with empty details, then it will throw error.
        Given AccessToken: "<accessToken>" to get employee id from access token
        When To get employee id from access token
        Then It will throw error: "<error>" with message: "<message>" to get employee id from access token
        And getEmployeeIdFromAccessToken function will call <getEmployeeIdFromAccessTokenFunctionCallCount> time to get employee id from access token

        Examples:
            | accessToken | getEmployeeIdFromAccessTokenFunctionCallCount | error           | message                     |
            |             | 0                                             | ValidationError | '"accessToken" is required' |

    Scenario Outline: Try to check access token existence with valid inputs
        Given AccessToken: "<accessToken>" to get employee id from access token
        When To get employee id from access token
        Then It will get employee id from access token with details: <employee_id>
        And getEmployeeIdFromAccessToken function will call <getEmployeeIdFromAccessTokenFunctionCallCount> time to get employee id from access token

        Examples:
            | accessToken              | employee_id | getEmployeeIdFromAccessTokenFunctionCallCount |
            | 1werc98n5u498ux398mu4302 | 1           | 1                                             |

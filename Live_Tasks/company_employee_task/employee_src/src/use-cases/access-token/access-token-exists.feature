Feature: Checking Access token existence

    Scenario Outline: Try to check access token existence with empty details, then it will throw error.
        Given Access token exists accessToken: "<accessToken>" to check access token existence by accessToken
        When To check access token existence by accessToken
        Then It will throw error: "<error>" with message: "<message>" to check access token existence by accessToken
        And accessTokenExists function will call <accessTokenExistsFunctionCallCount> time to check access token existence by accessToken

        Examples:
            | accessToken | accessTokenExistsFunctionCallCount | error           | message                     |
            |             | 0                                  | ValidationError | '"accessToken" is required' |

    Scenario Outline: Try to check access token existence with valid inputs
        Given Access token exists accessToken: "<accessToken>" to check access token existence by accessToken
        When To check access token existence by accessToken
        Then It will check access token existence  by accessToken with details: <existenceStatus>
        And accessTokenExists function will call <accessTokenExistsFunctionCallCount> time to check access token existence by accessToken

        Examples:
            | accessToken               | existenceStatus | accessTokenExistsFunctionCallCount |
            | 1werc98n5u498ux398mu4302 | 1               | 1                                  |
            
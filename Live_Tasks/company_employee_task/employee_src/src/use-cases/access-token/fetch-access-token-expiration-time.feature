Feature: Fetching access token expiration time

    Scenario Outline: Try fetch access token expiration time empty details, then it will throw error.
        Given AccessToken: "<accessToken>" to fetch access token expiration time
        When To fetch access token expiration time
        Then It will throw error: "<error>" with message: "<message>" to fetch access token expiration time
        And fetchExpirationTime function will call <fetchExpirationTimeFunctionCallCount> time to fetch access token expiration time

        Examples:
            | accessToken | fetchExpirationTimeFunctionCallCount | error           | message                     |
            |             | 0                                    | ValidationError | '"accessToken" is required' |

    Scenario Outline: Try fetch access token expiration time with valid inputs
        Given AccessToken: "<accessToken>" to fetch access token expiration time
        When To fetch access token expiration time
        Then It will fetch access token expiration time with details: "<expirationTime>"
        And fetchExpirationTime function will call <fetchExpirationTimeFunctionCallCount> time to fetch access token expiration time

        Examples:
            | accessToken | expirationTime             | fetchExpirationTimeFunctionCallCount |
            | 1           | '2023-06-14T08:34:58.000Z' | 1                                    |
Feature: Deleting Multiple Employees

    # Scenario Outline: Try to delete multiple employees with different access tokens
    #     Given Access tokens '<accessTokens>'
    #     When Try to delete multiple employees
    #     Then It will delete employees: "<deleteDetails>"
    #     And The deleteMultipleEmployees function will be called "<deleteMultipleEmployeesFunctionCallCount>" times
    #     And The accessTokenExists function will be called for each access token "<accessTokenExistsFunctionCallCount>" times
    #     And The accessTokenExpirationTime function will be called for each access token "<accessTokenExpirationTimeFunctionCallCount>" times
    #     And The getEmployeeIdFromAccessToken function will be called for each access token "<getEmployeeIdFromAccessTokenFunctionCallCount>" times

    #     Examples:
    #         | accessTokens | deleteDetails | deleteMultipleEmployeesFunctionCallCount | accessTokenExistsFunctionCallCount | accessTokenExpirationTimeFunctionCallCount | getEmployeeIdFromAccessTokenFunctionCallCount | error           | messege                                               |
    #         | []           | true          | 1                                        | 1                                  | 1                                          | 1                                             | ValidationError | '"accessTokens" does not contain 1 required value(s)' |
#         | ["token1", "token2"]                     | true          | 2                                        | 2                                  | 2                                          | 2                                             |       |         |
#         | ["token1", "token2", "token3"]           | true          | 3                                        | 3                                  | 3                                          | 3                                             |       |         |
#         | ["token1", "token2", "token3", "token4"] | true          | 4                                        | 4                                  | 4                                          | 4                                             |       |         |

# Scenario: Try to delete multiple employees with invalid access tokens
#     Given Access tokens "<accessTokens>"
#     When Try to delete multiple employees
#     Then It will throw error: "InvalidTokenError" with message: "Invalid access token: token2" while deleting employees

#     Examples:
#         | accessTokens | deleteMultipleEmployeesFunctionCallCount | accessTokenExistsFunctionCallCount | accessTokenExpirationTimeFunctionCallCount | getEmployeeIdFromAccessTokenFunctionCallCount | error           | messege                                        |
#         | []           | 0                                        | 0                                  | 0                                          | 0                                             | ValidationError | 'At least one "accessTokens" must be provided' |
#         | ["token1"]   | 0                                        | 1                                  | 1                                          | 0                                             |                 | `Expired access token`                         |
#         | ["token1"]   | 0                                        | 1                                  | 1                                          | 0                                             |                 | `Invalid access token`                         |

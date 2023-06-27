Feature: Insert Access token

    Scenario Outline: Try to check accessToken Exists By EmployeeId when inserting access token
        Given Employee details employeeId: "<employeeId>", accessToken: "<accessToken>",expirationTime: "<expirationTime>",createdAt: "<createdAt>", ipAddress: "<ipAddress>", city: "<city>" ,state: "<state>" , country: "<country>", deviceName:"<deviceName>", browserName:"<browserName>" to create new employee
        When Try to insert accessToken
        Then It will throw error: "<error>" with message: "<message>" while checking accessToken Exists By EmployeeId when inserting access token
        And insertAccessToken function will call <insertAccessTokenFunctionCallCount> time while inserting access token
        And accessTokenExistsByEmployeeId function will call <accessTokenExistsByEmployeeIdFunctionCallCount> time while inserting access token
        And updateAccessToken function will call <updateAccessTokenFunctionCallCount> time while inserting access token

        Examples:
            | employeeId | accessToken     | expirationTime      | createdAt           | ipAddress       | city      | state | country | deviceName | browserName | insertAccessTokenFunctionCallCount | accessTokenExistsByEmployeeIdFunctionCallCount | updateAccessTokenFunctionCallCount | error           | message                        |
            |            |                 |                     |                     |                 |           |       |         |            |             | 0                                  | 0                                              | 0                                  | ValidationError | '"employeeId" is required'     |
            | 1          |                 |                     |                     |                 |           |       |         |            |             | 0                                  | 0                                              | 0                                  | ValidationError | '"accessToken" is required'    |
            | 1          | ewrm843xnymry5t |                     |                     |                 |           |       |         |            |             | 0                                  | 0                                              | 0                                  | ValidationError | '"expirationTime" is required' |
            | 1          | ewrm843xnymry5t | 2023-06-14 14:04:58 |                     |                 |           |       |         |            |             | 0                                  | 0                                              | 0                                  | ValidationError | '"createdAt" is required'      |
            | 1          | ewrm843xnymry5t | 2023-06-14 14:04:58 | 2023-06-14 14:04:58 |                 |           |       |         |            |             | 0                                  | 0                                              | 0                                  | ValidationError | '"ipAddress" is required'      |
            | 1          | ewrm843xnymry5t | 2023-06-14 14:04:58 | 2023-06-14 14:04:58 | 103.238.107.135 |           |       |         |            |             | 0                                  | 0                                              | 0                                  | ValidationError | '"city" is required'           |
            | 1          | ewrm843xnymry5t | 2023-06-14 14:04:58 | 2023-06-14 14:04:58 | 103.238.107.135 | Ahmedabad |       |         |            |             | 0                                  | 0                                              | 0                                  | ValidationError | '"state" is required'          |
            | 1          | ewrm843xnymry5t | 2023-06-14 14:04:58 | 2023-06-14 14:04:58 | 103.238.107.135 | Ahmedabad | GJ    |         |            |             | 0                                  | 0                                              | 0                                  | ValidationError | '"country" is required'        |
            | 1          | ewrm843xnymry5t | 2023-06-14 14:04:58 | 2023-06-14 14:04:58 | 103.238.107.135 | Ahmedabad | GJ    | IN      |            |             | 0                                  | 0                                              | 0                                  | ValidationError | '"deviceName" is required'     |
            | 1          | ewrm843xnymry5t | 2023-06-14 14:04:58 | 2023-06-14 14:04:58 | 103.238.107.135 | Ahmedabad | GJ    | IN      | phone      |             | 0                                  | 0                                              | 0                                  | ValidationError | '"browserName" is required'    |
 
    Scenario Outline: Try to create new employee with valid inputs
        Given Employee details employeeId: "<employeeId>", accessToken: "<accessToken>",expirationTime: "<expirationTime>",createdAt: "<createdAt>", ipAddress: "<ipAddress>", city: "<city>" ,state: "<state>" , country: "<country>", deviceName:"<deviceName>", browserName:"<browserName>" to create new employee
        When Try to insert accessToken
        Then It will insert access token with details: <insertedAccessTokenId>
        And insertAccessToken function will call <insertAccessTokenFunctionCallCount> time while inserting access token
        And accessTokenExistsByEmployeeId function will call <accessTokenExistsByEmployeeIdFunctionCallCount> time while inserting access token
        And updateAccessToken function will call <updateAccessTokenFunctionCallCount> time while inserting access token

        Examples:
            | employeeId | accessToken     | expirationTime      | createdAt           | ipAddress       | city      | state | country | deviceName | browserName | insertedAccessTokenId | insertAccessTokenFunctionCallCount | accessTokenExistsByEmployeeIdFunctionCallCount | updateAccessTokenFunctionCallCount |
            | 1          | ewrm843xnymry5t | 2023-06-14 14:04:58 | 2023-06-14 14:04:58 | 103.238.107.135 | Ahmedabad | GJ    | IN      | phone      | chrome      | 1                  | 1                                  | 1                                              | 0                                  |

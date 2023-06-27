Feature: Getting All Employees

    Scenario Outline: Try to get all employees with invalid details, then it will throw error.
        Given Access Token details accessToken: "<accessToken>" to get all employees
        When Try to get all employees
        Then It will throw error: "<error>" with message: "<message>" while getting all employees
        Examples:
            | accessToken | accessTokenExistsFunctionCallCount | accessTokenExpirationTimeFunctionCallCount | updateAccessTokenTimeFunctionCallCount | getAllEmployeesFunctionCallCount | error           | message                     |
            |             | 0                                  | 0                                          | 0                                      | 0                                | ValidationError | '"accessToken" is required' |


    Scenario Outline: Try to get all employees when details are correct
        Given Access Token details accessToken: "<accessToken>" to get all employees
        When Try to get all employees
        And Updating AccessToken Time accessToken: "<accessToken>" and updatedExpirationTime: "<updatedExpirationTime>" to get all employees
        Then It will get all employees: '<employeeDetails>'
        And getAllEmployees function will call <getAllEmployeesFunctionCallCount> time when getting all employees

        Examples:
            | accessToken      | employeeDetails            | updatedExpirationTime    | accessTokenExistsFunctionCallCount | accessTokenExpirationTimeFunctionCallCount | updateAccessTokenTimeFunctionCallCount | getAllEmployeesFunctionCallCount |
            | exnhy43r872yx87x | ["Employee1", "Employee2"] | 2023-06-21T03:53:36.810Z | 1                                  | 1                                          | 1                                      | 1                                |

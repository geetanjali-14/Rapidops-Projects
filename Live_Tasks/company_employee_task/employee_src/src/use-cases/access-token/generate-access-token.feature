Feature: Generating Access Token

  Scenario Outline: Try to generate access token with empty details, then it will throw an error
    Given employeeId: "<employeeId>" to generate access token
    When To generate accessToken
    Then It will throw error: "<error>" with message: "<message>" while generating accessToken

    Examples:
      | employeeId | error           | message                         |
      | a          | ValidationError | '"employeeId" must be a number' |

  Scenario Outline: Try to generate access token with valid inputs
    Given employeeId: "<employeeId>" to generate access token
    When To generate accessToken
    Then It will generate an access token: "<accessToken>"

    Examples:
      | employeeId | accessToken         |
      | 1          | 3m8z2498y510nc2ymc |

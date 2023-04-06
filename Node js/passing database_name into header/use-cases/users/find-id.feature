Feature: Find User Id.

    Scenario Outline: Try to find user id with invalid details, then it will throw error.
        Given User details email: "<email>" to find id
        When Try to find user id
        Then It will throw error: "<error>" with message: "<message>" while find user id
        And findId function will call <findUserIdFunctionCallCount> time while finding user id

        Examples:
            | email      | findUserIdFunctionCallCount | error | message                        |
            |            | 0                           | Error | '"email" is required'             |
            | geetanjali | 0                           | Error | '"email" must be a valid email' |

Scenario Outline: Try to find user id with valid details.
    Given User details email: "<email>" to find id
    When Try to find user id
    Then It will find user id with details: "<userIdDetails>"
    And findId function will call <findUserIdFunctionCallCount> time while finding user id

    Examples:
        | email                | userIdDetails | findUserIdFunctionCallCount |
        | geetanjali@gmail.com | '{"id": 1}'   | 1                           |

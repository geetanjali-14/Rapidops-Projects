Feature: Find User exist or not.

    Scenario Outline: Try to find that user exists with invalid details, then it will throw error.
        Given User details id: "<id>" to find user existence
        When Try to find user existence
        Then It will throw error: "<error>" with message: "<message>" while finding user existence
        And userExists function will call <userExistsFunctionCallCount> time while finding user

        Examples:
            | id | userExistsFunctionCallCount | error | message                 |
            |    | 0                           | Error | '"id" is required'      |
            | a  | 0                           | Error | '"id" must be a number' |

    Scenario Outline: Try to find that user exists with valid details.
        Given User details id: "<id>" to find user existence
        When Try to find user existence
        Then It will find user with details: <userExists>
        And userExists function will call <userExistsFunctionCallCount> time while finding user

        Examples:
            | id | userExists | userExistsFunctionCallCount |
            | 23 | 1          | 1                           |
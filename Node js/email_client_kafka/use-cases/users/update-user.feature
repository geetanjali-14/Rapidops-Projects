Feature: Update User.

    Scenario Outline: Try to update user with invalid details, then it will throw error.
        Given User details id: "<id>", name: "<name>" to update user
        When Try to update user
        Then It will throw error: "<error>" with message: "<message>" while updating user
        And updateUser function will call <updateUserFunctionCallCount> time while updating user

        Examples:
            | id | name       | updateUserFunctionCallCount | error | message                 |
            |    |            | 0                           | Error | '"id" is required'      |
            | a  |            | 0                           | Error | '"id" must be a number' |
            | 1  |            | 0                           | Error | '"name" is required'    |
            |    | Geetanjali | 0                           | Error | '"id" is required'      |
            | a  | Geetanjali | 0                           | Error | '"id" must be a number' |


Scenario Outline: Try to update user with valid details.
    Given User details id: "<id>", name: "<name>" to update user
    When Try to update user
    Then It will update user with details: <userDetails>
    And updateUser function will call <updateUserFunctionCallCount> time while updating user

    Examples:
        | id | name       | userDetails | updateUserFunctionCallCount |
        | 1  | Geetanjali | '{"id": 1}' | 1                           |
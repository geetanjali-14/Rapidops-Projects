Feature: Delete User.

    Scenario Outline: Try to delete user with invalid details, then it will throw error.
        Given User details id: "<id>" to delete user
        When Try to delete user
        Then It will throw error: "<error>" with message: "<message>" while deleting user
        And deleteUser function will call <deleteUserFunctionCallCount> time while deleting user

        Examples:
            | id | deleteUserFunctionCallCount | error | message                 |
            |    | 0                           | Error | '"id" is required'      |
            | a  | 0                           | Error | '"id" must be a number' |

Scenario Outline: Try to delete user with valid inputs.
    Given User details id: "<id>" to delete user
    When Try to delete user
    Then It will delete user with details: "<deletedUserDetails>"
    And deleteUser function will call <deleteUserFunctionCallCount> time while deleting user

    Examples:
        | id | deletedUserDetails | deleteUserFunctionCallCount |
        | 1  | '{"id": 1}'        | 1                           |

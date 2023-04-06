Feature: Get User By ID.

    Scenario Outline: Try to get user with invalid id, then it will throw error.
        Given User details id: "<id>" to get user details
        When Try to get user details
        Then It will throw error: "<error>" with message: "<message>" while getting user by id
        And getUserById function will call <getUserByIdFunctionCallCount> time while getting user details

        Examples:
            | id | getUserByIdFunctionCallCount | error | message                   |
            |    | 0                            | Error | '"id" is required'        |
            | a  | 0                            | Error | "\"id\" must be a number" |

    Scenario Outline: Try to get user with valid id.
        Given User details id: "<id>" to get user details
        When Try to get user details
        Then It will get user with details: "<userDetails>"
        And getUserById function will call <getUserByIdFunctionCallCount> time while getting user details

        Examples:
            | id | userDetails | getUserByIdFunctionCallCount |
            | 1  | '{"id":1}'  | 1                            |
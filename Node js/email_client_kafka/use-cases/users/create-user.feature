Feature: Create New User.

    Scenario Outline: Try to create new user with invalid details, then it will throw error.
        Given User details name: "<name>", email: "<email>", and password: "<password>" to create new user
        When Try to create new user
        Then It will throw error: "<error>" with message: "<message>" while creating new user
        And createUser function will call <createUserFunctionCallCount> time while creating new user

        Examples:
            | name       | email              | password        | createUserFunctionCallCount | error | message                                                |
            |            |                    |                 | 0                           | Error | '"name" is required'                                   |
            |            | geetu              |                 | 0                           | Error | '"name" is required'                                   |
            |            | geetu@rapidops.com | 123423cfreggef  | 0                           | Error | '"name" is required'                                   |
            | Geetanjali |                    |                 | 0                           | Error | '"email" is required'                                  |
            | Geetanjali | geetu              |                 | 0                           | Error | '"email" must be a valid email'                        |
            | Geetanjali | geetu@rapidops.com |                 | 0                           | Error | '"password" is required'                               |
            | Geetanjali | geetu@rapidops.com | 1234            | 0                           | Error | '"password" length must be at least 8 characters long' |
            | Geetanjali | geetu@com          | reggef          | 0                           | Error | '"email" must be a valid email'                        |
            | Geetanjali |                    | skdmceifniremcw | 0                           | Error | '"email" is required'                                  |

    Scenario Outline: Try to create new user with valid inputs, then it will throw error.
        Given User details name: "<name>", email: "<email>", and password: "<password>" to create new user
        When Try to create new user
        Then It will create new user with details: "<newUserDetails>"
        And createUser function will call <createUserFunctionCallCount> time while creating new user

        Examples:
            | name       | email              | password   | newUserDetails | createUserFunctionCallCount |
            | Geetanjali | geetu@rapidops.com | 1234567890 | '{"id": 1}'    | 1                           |
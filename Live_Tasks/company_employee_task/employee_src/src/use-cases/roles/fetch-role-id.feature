Feature: Fetching id.

    Scenario Outline: Try to fetch id with invalid details, then it will throw an error.
        Given Employee details role: "<role>" to fetch id
        When Try to fetch id
        Then It will throw error: "<error>" with message: "<message>" while trying to fetch id
        And fetchRoleId function will be called <fetchRoleIdFunctionCallCount> times while trying to fetch id

        Examples:
            | role | fetchRoleIdFunctionCallCount | error           | message                       |
            |      | 0                            | ValidationError | "\"roleId\" is required"      |
            | 7    | 0                            | ValidationError | "\"roleId\" must be a string" |

    Scenario Outline: Try to fetch id with valid inputs.
        Given Employee details role: "<role>" to fetch id
        When Try to fetch id
        Then It will fetch id with details: <fetchedId>
        And fetchRoleId function will be called <fetchRoleIdFunctionCallCount> times while trying to fetch id

        Examples:
            | role  | fetchedId | fetchRoleIdFunctionCallCount |
            | admin | 4         | 1                            |

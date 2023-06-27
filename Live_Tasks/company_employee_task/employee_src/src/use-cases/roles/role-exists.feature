Feature: Check role existence

    Scenario Outline: Try to check role existence with invalid details, then it will throw an error.
        Given Employee details roleId: "<role>" to check role existence
        When Try to check role existence
        Then It will throw error: "<error>" with message: "<message>" while trying to check role existence
        And roleExists function will be called <roleExistsFunctionCallCount> times while trying to check role existence

        Examples:
            | role | roleExistsFunctionCallCount | error           | message                |
            |      | 0                           | ValidationError | "\"role\" is required" |

    Scenario Outline: Try to fetch id with valid inputs.
        Given Employee details role: "<role>" to check role existence
        When Try to check role existence
        Then It will check role existence with details: <fetchedName>
        And roleExists function will be called <roleExistsFunctionCallCount> times while trying to check role existence

        Examples:
            | role | fetchedName | roleExistsFunctionCallCount |
            | 2    | admin       | 1                           |

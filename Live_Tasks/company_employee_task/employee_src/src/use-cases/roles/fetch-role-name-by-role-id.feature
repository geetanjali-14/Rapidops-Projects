Feature: Fetching role name.

    Scenario Outline: Try to fetch role name with invalid details, then it will throw an error.
        Given Employee details roleId: "<roleId>" to fetch role name
        When Try to fetch role name
        Then It will throw error: "<error>" with message: "<message>" while trying to fetch role name
        And fetchRoleNameByRoleId function will be called <fetchRoleNameByRoleIdFunctionCallCount> times while trying to fetch role name

        Examples:
            | roleId | fetchRoleNameByRoleIdFunctionCallCount | error           | message                  |
            |        | 0                                      | ValidationError | "\"roleId\" is required" |

    Scenario Outline: Try to fetch id with valid inputs.
        Given Employee details role: "<role>" to fetch role name
        When Try to fetch role name
        Then It will fetch role name with details: <fetchedName>
        And fetchRoleNameByRoleId function will be called <fetchRoleNameByRoleIdFunctionCallCount> times while trying to fetch role name

        Examples:
            | roleId | fetchedName | fetchRoleNameByRoleIdFunctionCallCount |
            | 2      | admin       | 1                                      |

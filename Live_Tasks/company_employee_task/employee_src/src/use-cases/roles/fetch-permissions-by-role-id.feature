Feature: Fetching permissions.

    Scenario Outline: Try to fetch permissions with invalid details, then it will throw an error.
        Given Employee details roleId: "<roleId>" to fetch permissions
        When Try to fetch permissions
        Then It will throw error: "<error>" with message: "<message>" while trying to fetch permissions
        And fetchPermissionsByRoleId function will be called <fetchPermissionsByRoleIdFunctionCallCount> times while trying to fetch permissions

        Examples:
            | roleId | fetchPermissionsByRoleIdFunctionCallCount | error           | message                       |
            | a      | 0                                         | ValidationError | "\"roleId\" must be a number" |

    Scenario Outline: Try to fetch permissions with valid inputs.
        Given Employee details roleId: "<roleId>" to fetch permissions
        When Try to fetch permissions
        Then It will fetch permissions with details: "<fetchedRoles>"
        And fetchPermissionsByRoleId function will be called <fetchPermissionsByRoleIdFunctionCallCount> times while trying to fetch permissions

        Examples:
            | roleId | fetchedRoles                                               | fetchPermissionsByRoleIdFunctionCallCount |
            | 7      | {"employee": ["read", "create"],"accessToken": ["update"]} | 1                                         |

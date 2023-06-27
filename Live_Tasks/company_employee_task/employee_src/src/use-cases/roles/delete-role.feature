Feature: Deleting Role.

    Scenario Outline: Try to delete role with invalid details, then it will throw an error.
        Given Employee details roleId: "<roleId>" to delete role
        When Try to delete role
        Then It will throw error: "<error>" with message: "<message>" while trying to delete role
        And deleteRole function will be called <deleteRoleFunctionCallCount> times while trying to delete role

        Examples:
            | roleId | deleteRoleFunctionCallCount | error           | message                       |
            | a      | 0                           | ValidationError | "\"roleId\" must be a number" |

    Scenario Outline: Try to delete role with valid inputs.
        Given Employee details roleId: "<roleId>" to delete role
        When Try to delete role
        Then It will delete role with details: <deletedRoleDetails>
        And deleteRole function will be called <deleteRoleFunctionCallCount> times while trying to delete role

        Examples:
            | roleId | deletedRoleDetails | deleteRoleFunctionCallCount |
            | 7      | 1                  | 1                           |

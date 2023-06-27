Feature: Fetch employee roles

    Scenario Outline: Try to fetch employee roles with invalid details, then it will throw an error.
        Given Employee details roleId: "<role>" to fetch employee roles
        When Try to fetch employee roles
        Then It will throw error: "<error>" with message: "<message>" while trying to fetch employee roles
        And fetchEmployeeRole function will be called <fetchEmployeeRoleFunctionCallCount> times while trying to fetch employee roles

        Examples:
            | employeeId | fetchEmployeeRoleFunctionCallCount | error           | message                |
            |            | 0                                  | ValidationError | "\"role\" is required" |

    Scenario Outline: Try to fetch employee roles with valid inputs.
        Given Employee details role: "<role>" to fetch employee roles
        When Try to fetch employee roles
        Then It will fetch employee roles with details: <fetchedRole>
        And fetchEmployeeRole function will be called <fetchEmployeeRoleFunctionCallCount> times while trying to fetch employee roles

        Examples:
            | employeeId | fetchedRole | fetchEmployeeRoleFunctionCallCount |
            | 2          | admin       | 1                                  |

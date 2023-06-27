Feature: Assign roles to employee

    Scenario Outline: Try to assign roles to employee with empty details, then it will throw error.
        Given Employee details employeeId: "<employeeId>", assignerId: "<assignerId>",roles: "<roles>" to assign roles to employee
        When Try to assign roles to employee
        Then It will throw error: "<error>" with message: "<message>" while assigning roles to employee

        Examples:
            | employeeId | assignerId | roles | assignEmployeeRolesFunctionCallCount | error           | message                    |
            |            |            |       | 0                                    | ValidationError | '"employeeId" is required' |
            | 1          |            |       | 0                                    | ValidationError | '"jobTitle" is required'   |
            | 1          | 2          |       | 0                                    | ValidationError | '"companyId" is required'  |

    Scenario Outline: Try to to assign roles to employee with valid inputs
        Given Employee details employeeId: "<employeeId>", assignerId: "<assignerId>",roles: "<roles>" to assign roles to employee
        When Try to assign roles to employee
        Then It will assign roles to employee with details: <assignedDetails>
        And assignEmployeeRoles function will call <assignEmployeeRolesFunctionCallCount> time while assigning roles to employee

        Examples:
            | employeeId | assignerId | roles   | assignedDetails | assignEmployeeRolesFunctionCallCount |
            | 1          | 2          | [admin] | 1               | 1                                    |
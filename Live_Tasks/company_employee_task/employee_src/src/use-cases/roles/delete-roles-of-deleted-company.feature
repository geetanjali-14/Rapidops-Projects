Feature: Deleting Role when its company is deleted.

    Scenario Outline: Try to delete role when its company is deleted with invalid details, then it will throw an error.
        Given Employee details companyId: "<companyId>" to delete role when its company is deleted
        When Try to delete role when its company is deleted
        Then It will throw error: "<error>" with message: "<message>" while trying to delete role when its company is deleted
        And deleteRolesOfDeletedCompany function will be called <deleteRolesOfDeletedCompanyFunctionCallCount> times while trying to delete role when its company is deleted

        Examples:
            | companyId | deleteRolesOfDeletedCompanyFunctionCallCount | error           | message                          |
            | a         | 0                                            | ValidationError | "\"companyId\" must be a number" |

    Scenario Outline: Try to delete role when its company is deleted with valid inputs.
        Given Employee details companyId: "<companyId>" to delete role when its company is deleted
        When Try to delete role when its company is deleted
        Then It will delete role when its company is deleted with details: <deletedRoleDetails>
        And deleteRolesOfDeletedCompany function will be called <deleteRolesOfDeletedCompanyFunctionCallCount> times while trying to delete role when its company is deleted
        Examples:
            | companyId | deletedRoleDetails | deleteRolesOfDeletedCompanyFunctionCallCount |
            | 7         | 1                  | 1                                            |

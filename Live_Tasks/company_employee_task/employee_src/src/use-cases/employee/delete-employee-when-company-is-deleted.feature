Feature: Deleting Employee when its company is deleted.

    Scenario Outline: Try to delete employee when its company is deleted with invalid details, then it will throw an error.
        Given Employee details companyId: "<companyId>" to delete employee when company is deleted
        When Try to delete employee when company is deleted
        Then It will throw error: "<error>" with message: "<message>" while trying to delete employee when company is deleted
        And deleteEmployeeOfDeletedCompany function will be called <deleteEmployeeOfDeletedCompanyFunctionCallCount> times while trying to delete an employee when the company is deleted

        Examples:
            | companyId | deleteEmployeeOfDeletedCompanyFunctionCallCount | error           | message                          |
            | a         | 0                                               | ValidationError | "\"companyId\" must be a number" |

    Scenario Outline: Try to delete an employee when its company is deleted with valid inputs.
        Given Employee details companyId: "<companyId>" to delete employee when company is deleted
        When Try to delete employee when company is deleted
        Then It will delete employee when company is deleted with details: <deletedEmployeeDetails>
        And deleteEmployeeOfDeletedCompany function will be called <deleteEmployeeOfDeletedCompanyFunctionCallCount> times while trying to delete an employee when the company is deleted

        Examples:
            | companyId | deletedEmployeeDetails | deleteEmployeeOfDeletedCompanyFunctionCallCount |
            | 7         | 1                      | 1                                               |

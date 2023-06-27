Feature: Updating Employee

    Scenario Outline: Try to update employee with empty details, then it will throw error.
        Given Employee details employeeId: "<employeeId>", employeeName: "<employeeName>", jobTitle: "<jobTitle>",companyId: "<companyId>",companyName: "<companyName>" to update employee
        When Try to update employee details
        Then It will throw error: "<error>" with message: "<message>" while updating employee
        Examples:
            | employeeId | employeeName | jobTitle | companyId | companyName | companyExistsFunctionCallCount | updateEmployeeFunctionCallCount | isVerifiedEmployeeFunctionCallCount | createEmployeeExistsFunctionCallCount | fetchCompanyIdByCompanyName | error           | message                      |
            |            |              |          |           |             | 0                              | 0                               | 0                                   | 0                                     | 0                           | ValidationError | '"employeeId" is required'   |
            | 1          |              |          |           |             | 0                              | 0                               | 0                                   | 0                                     | 0                           | ValidationError | '"employeeName" is required' |
            | 1          | Geetanjali   |          |           |             | 0                              | 0                               | 0                                   | 0                                     | 0                           | ValidationError | '"jobTitle" is required'     |
            | 1          | Geetanjali   | Intern   |           |             | 0                              | 0                               | 0                                   | 0                                     | 0                           | ValidationError | '"companyId" is required'    |
            | 1          | Geetanjali   | Intern   | 2         |             | 0                              | 0                               | 0                                   | 0                                     | 0                           | ValidationError | '"companyName" is required'  |

    Scenario Outline: Try to update employee when company does not exists,employee does not exists or employee is unverified
        Given Employee details employeeId: "<employeeId>", employeeName: "<employeeName>", jobTitle: "<jobTitle>",companyId: "<companyId>",companyName: "<companyName>" to update employee
        When Try to update employee details
        And Employee Exists employeeId: "<employeeId>" to update employee
        Then It will throw error: "<error>" with message: "<message>" while updating employee
        And createEmployeeExists function will call <createEmployeeExistsFunctionCallCount> time while updating employee

        Examples:
            | employeeId | employeeName | jobTitle | companyId | companyName | companyExistsFunctionCallCount | updateEmployeeFunctionCallCount | isVerifiedEmployeeFunctionCallCount | createEmployeeExistsFunctionCallCount | error               | message                           |
            | 1          | Geetanjali   | Intern   | 1         | Rapidops    | 0                              | 0                               | 0                                   | 1                                     | ObjectNotFoundError | 'Employee Entered Does not exist' |

    Scenario Outline: Try to update employee when employee is unverified
        Given Employee details employeeId: "<employeeId>", employeeName: "<employeeName>", jobTitle: "<jobTitle>",companyId: "<companyId>",companyName: "<companyName>" to update employee
        When Try to update employee details
        And Employee is verified employeeId: "<employeeId>" to update employee
        Then It will throw error: "<error>" with message: "<message>" while updating employee
        And isVerifiedEmployee function will call <isVerifiedEmployeeFunctionCallCount> time while updating employee
        Examples:
            | employeeId | employeeName | jobTitle | companyId | companyName | companyExistsFunctionCallCount | updateEmployeeFunctionCallCount | isVerifiedEmployeeFunctionCallCount | createEmployeeExistsFunctionCallCount | error              | message                                   |
            | 2          | Geetanjali   | Intern   | 2         | Rapidops    | 0                              | 0                               | 1                                   | 1                                     | InvalidAccessError | 'Employee Entered is not a verified user' |

    Scenario Outline: Try to update employee when company does not exists
        Given Employee details employeeId: "<employeeId>", employeeName: "<employeeName>", jobTitle: "<jobTitle>",companyId: "<companyId>",companyName: "<companyName>" to update employee
        When Try to update employee details
        And Company Exists companyId: "<companyId>" to update employee
        Then It will throw error: "<error>" with message: "<message>" while updating employee
        And companyExists function will call <companyExistsFunctionCallCount> time while updating employee
        And updateEmployee function will call <updateEmployeeFunctionCallCount> time while updating employee

        Examples:
            | employeeId | employeeName | jobTitle | companyId | companyName | companyExistsFunctionCallCount | updateEmployeeFunctionCallCount | isVerifiedEmployeeFunctionCallCount | createEmployeeExistsFunctionCallCount | error               | message                          |
            | 3          | Geetanjali   | Intern   | 3         | Rapido      | 1                              | 0                               | 1                                   | 1                                     | ObjectNotFoundError | 'Company Entered Does not exist' |


    Scenario Outline: Try to update employee with valid inputs
        Given Employee details employeeId: "<employeeId>", employeeName: "<employeeName>", jobTitle: "<jobTitle>",companyId: "<companyId>",companyName: "<companyName>" to update employee
        When Try to update employee details
        Then It will update employee: <updateDetails>
        And fetchCompanyIdByCompanyName function will call <fetchCompanyIdByCompanyNameFunctionCallCount> time while updating employee
        And companyExists function will call <companyExistsFunctionCallCount> time while updating employee
        And updateEmployee function will call <updateEmployeeFunctionCallCount> time while updating employee
        And isVerifiedEmployee function will call <isVerifiedEmployeeFunctionCallCount> time while updating employee
        And createEmployeeExists function will call <createEmployeeExistsFunctionCallCount> time while updating employee

        Examples:
            | employeeId | employeeName | jobTitle | companyId | companyName | updateDetails | companyExistsFunctionCallCount | updateEmployeeFunctionCallCount | isVerifiedEmployeeFunctionCallCount | createEmployeeExistsFunctionCallCount | fetchCompanyIdByCompanyNameFunctionCallCount |
            | 1          | Geetanjali   | Intern   | 2         | Rapidops    | 1             | 1                              | 1                               | 1                                   | 1                                     | 1                                            |
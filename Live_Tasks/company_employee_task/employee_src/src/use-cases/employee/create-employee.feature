Feature: Create New Employee

    Scenario Outline: Try to create new employee with empty details, then it will throw error.
        Given Employee details employeeName: "<employeeName>", jobTitle: "<jobTitle>",companyId: "<companyId>",companyName: "<companyName>", employeeEmail: "<employeeEmail>", password: "<password>" to create new employee
        When Try to create new employee
        Then It will throw error: "<error>" with message: "<message>" while creating new employee
       
        Examples:
            | employeeName | jobTitle | companyId | companyName | employeeEmail        | password | createEmployeeFunctionCallCount | error           | message                                                |
            |              |          |           |             |                      |          | 0                               | ValidationError | '"employeeName" is required'                           |
            | Geetanjali   |          |           |             |                      |          | 0                               | ValidationError | '"jobTitle" is required'                               |
            | Geetanjali   | Intern   |           |             |                      |          | 0                               | ValidationError | '"companyId" is required'                              |
            | Geetanjali   | Intern   | 2         |             |                      |          | 0                               | ValidationError | '"companyName" is required'                            |
            | Geetanjali   | Intern   | 2         | Rapidops    |                      |          | 0                               | ValidationError | '"employeeEmail" is required'                          |
            | Geetanjali   | Intern   | 2         | Rapidops    | geetanjali@gmail.com |          | 0                               | ValidationError | '"password" is required'                               |
            | Geetanjali   | Intern   | 2         | Rapidops    | geetanjali@gmail.com | abc      | 0                               | ValidationError | '"password" length must be at least 6 characters long' |

    Scenario Outline: Try to create new employee with valid inputs
        Given Employee details employeeName: "<employeeName>", jobTitle: "<jobTitle>",companyId: "<companyId>",companyName: "<companyName>", employeeEmail: "<employeeEmail>", password: "<password>" to create new employee
        When Try to create new employee
        Then It will create new employee with details: <newEmployeeID>
        And createEmployee function will call <createEmployeeFunctionCallCount> time while creating new employee
       
        Examples:
            | employeeName | jobTitle | companyId | companyName | employeeEmail        | password          | newEmployeeID | createEmployeeFunctionCallCount | 
            | Geetanjali   | Intern   | 2         | Rapidops    | geetanjali@gmail.com | abcf123jerfreieir | 1             | 1                               | 
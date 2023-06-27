Feature: Checking company existence

    Scenario Outline: Try to check company existence with empty details, then it will throw error.
        Given company details companyId: "<companyId>" to check company existence
        When Try to check company existence
        Then It will throw error: "<error>" with message: "<message>" while checking company existence
        And companyExists function will call <companyExistsFunctionCallCount> time while checking company existence

        Examples:
            | companyId | companyExistsFunctionCallCount | error           | message                   |
            |           | 0                              | ValidationError | '"companyId" is required' |

    Scenario Outline: Try to check company existence with valid inputs
        Given company details companyId: "<companyId>" to check company existence
        When Try to check company existence
        Then It will check company existence with details: <employeeExists>
        And companyExists function will call <companyExistsFunctionCallCount> time while checking company existence

        Examples:
            | companyId | employeeExists | companyExistsFunctionCallCount |
            | 1         | 1              | 1                              |
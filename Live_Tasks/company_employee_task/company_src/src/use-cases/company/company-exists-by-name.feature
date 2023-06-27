Feature: Checking company existence by name

    Scenario Outline: Try to check company existence by name with empty details, then it will throw error.
        Given company details companyName: "<companyName>" to check company existence by name
        When Try to check company existence by name
        Then It will throw error: "<error>" with message: "<message>" while checking company existence by name
        And companyExistsByName function will call <companyExistsByNameFunctionCallCount> time while checking company existence by name

        Examples:
            | companyName | companyExistsByNameFunctionCallCount | error           | message                     |
            |             | 0                                    | ValidationError | '"companyName" is required' |

    Scenario Outline: Try to check company existence by name with valid inputs
        Given company details companyName: "<companyName>" to check company existence by name
        When Try to check company existence by name
        Then It will check company existence by name with details: <employeeExists>
        And companyExistsByName function will call <companyExistsByNameFunctionCallCount> time while checking company existence by name

        Examples:
            | companyName | employeeExists | companyExistsByNameFunctionCallCount |
            | 1           | 1              | 1                                    |
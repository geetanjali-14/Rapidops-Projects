Feature: Checking Company Name Existence

    Scenario Outline: Try to check company name existence with invalid details, then it will throw an error
        Given Company details company_name: "<company_name>" and database_name: "<database_name>" to check company name existence
        When Try to check company existence
        Then It will throw error: "<error>" with message: "<message>" while checking company existence with invalid fields
        And companyExists function will call <companyExistsFunctionCallCount> time while checking company existence

        Examples:
            | company_name | database_name | companyExistsFunctionCallCount | error           | message                              |
            |              |               | 0                              | ValidationError | '"company_name" is required'         |
            | 2            |               | 0                              | ValidationError | '"database_name" is required'        |
            | a            |               | 0                              | ValidationError | "\"company_name\" must be a number"  |
            | 1            | 1             | 0                              | ValidationError | "\"database_name\" must be a string" |

    Scenario Outline: Try to check company's existence of non-existing company_name, then it will throw an error
        Given Company details company_name: "<company_name>" and database_name: "<database_name>" to check company name existence
        When Try to check company existence
        Then It will throw error: "<error>" with message: "<message>" while checking company existence
        And companyExists function will call <companyExistsFunctionCallCount> time while checking company existence

        Examples:
            | company_name | database_name | companyExistsFunctionCallCount | error          | message                               |
            | 1            | company       | 0                              | ForbiddenError | "company with this ID does not exist" |

    Scenario Outline: Try to check company existence with valid inputs
        Given Company details company_name: "<company_name>" and database_name: "<database_name>" to check company name existence
        When Try to check company existence
        Then It will check company existence with result: <existenceStatus>
        And companyExists function will call <companyExistsFunctionCallCount> time while checking company existence

        Examples:
            | company_name | database_name | existenceStatus | companyExistsFunctionCallCount |
            | 2            | company       | 1               | 1                              |

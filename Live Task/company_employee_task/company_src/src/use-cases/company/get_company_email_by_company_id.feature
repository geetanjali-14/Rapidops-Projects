Feature: Find Company Email by Company ID

    Scenario Outline: Try to fetch company email by company ID with valid and invalid details
        Given company details company_id: "<company_id>", database_name: "<database_name>" to fetch company email by company ID
        When Try to fetch company email by company ID
        Then It will throw error: "<error>" with message: "<message>" when company does not exist
        And getCompanyEmailByCompanyId function will be called <companyEmailByCompanyIdFunctionCallCount> time

        Examples:
            | company_id | database_name | error           | message                               | companyEmailByCompanyIdFunctionCallCount |
            | 123        | TestDB        | ValidationError | "Invalid company ID provided"         | 0                                        |
            | 123        |               | ValidationError | "Invalid database name provided"      | 0                                        |
            | 123        | TestDB        | ForbiddenError  | "Company Does not Exist with this id" | 1                                        |

    Scenario Outline: Try to fetch company email by company ID with valid details
        Given company details company_id: "<company_id>", database_name: "<database_name>" to fetch company email by company ID
        When Try to fetch company email by company ID
        Then It will fetch company email: "<companyEmail>" when company exists
        And getCompanyEmailByCompanyId function will be called <companyEmailByCompanyIdFunctionCallCount> time

        Examples:
            | company_id | database_name | companyEmail       | companyEmailByCompanyIdFunctionCallCount |
            | 123        | TestDB        | "test@example.com" | 1                                        |

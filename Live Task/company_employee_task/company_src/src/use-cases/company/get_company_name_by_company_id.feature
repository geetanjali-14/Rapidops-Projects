Feature: Find Company Name by Company ID

    Scenario Outline: Try to fetch company name by company ID with valid and invalid details
        Given company details company_id: "<company_id>", database_name: "<database_name>" to fetch company name by company ID
        And Company Exists returns result is: "<companyExistsDetails>"
        When Try to fetch company name by company ID
        Then It will throw error: "<error>" with message: "<message>" while fetching company name by company ID with empty fields
        And It will throw error: "<error>" with message: "<message>" while fetching company name by company ID with wrong fields
        And It will throw error: "<error>" with message: "<message>" while fetching company name by company ID when company ID entered does not exist
        And It will fetch company name by company ID with details: "<companyDetails>"
        And getCompanyNameByCompanyId function will call <companyNameByCompanyIdFunctionCallCount> time while fetching company name by company ID
        And companyExists function will call <companyExistsCallCount> time while fetching company name by company ID

        Examples:
            | company_id | database_name | companyExistsDetails | error           | message                                  | companyNameByCompanyIdFunctionCallCount | companyExistsCallCount |
            | 123        | TestDB        | 1                    | ValidationError | "Invalid company ID and role provided"   | 0                                       | 0                      |
            | 123        | TestDB        | 0                    | ValidationError | "Invalid company ID provided"            | 0                                       | 0                      |
            | 123        |               | 1                    | ValidationError | "Invalid database name provided"         | 0                                       | 0                      |
            | 123        | TestDB        | 0                    | ForbiddenError  | "The company with ID 123 does not exist" | 0                                       | 1                      |

    Scenario Outline: Try to fetch company name by company ID with valid details
        Given company details company_id: "<company_id>", database_name: "<database_name>" to fetch company name by company ID
        And Company Exists returns result is: "<companyExistsDetails>"
        When Try to fetch company name by company ID
        And It will fetch company name by company ID with details: "<companyDetails>"
        And getCompanyNameByCompanyId function will call <companyNameByCompanyIdFunctionCallCount> time while fetching company name by company ID
        And companyExists function will call <companyExistsCallCount> time while fetching company name by company ID

        Examples:
            | company_id | database_name | companyExistsDetails | companyDetails | companyNameByCompanyIdFunctionCallCount | companyExistsCallCount |
            | 123        | TestDB        | 1                    | "Rapidops"     | 1                                       | 1                      |

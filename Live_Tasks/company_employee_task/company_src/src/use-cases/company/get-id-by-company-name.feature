Feature: Fetching company id by company name

    Scenario Outline: Try to fetch company id by company name with empty details, then it will throw error.
        Given Company details companyName: "<companyName>" while fetching company id by company name
        When Try to fetch company id by company name
        Then It will throw error: "<error>" with message: "<message>" while fetching company id by company name
        And createCompanyExistByName function will call <createCompanyExistByNameFunctionCallCount> time while fetching company id by company name
        And findIdByCompanyName function will call <findIdByCompanyNameFunctionCallCount> time while fetching company id by company name

        Examples:
            | companyName | createCompanyExistByNameFunctionCallCount | findIdByCompanyNameFunctionCallCount | error           | message                     |
            |             | 0                                         | 0                                    | ValidationError | '"companyName" is required' |

    Scenario Outline: Try to fetch company id by company name with valid inputs
        Given Company details companyName: "<companyName>" while fetching company id by company name
        When Try to fetch company id by company name
        And Company Exists by Name: <companyExistsResult>
        Then It will get company ID: <companyId>
        And createCompanyExistByName function will call <createCompanyExistByNameFunctionCallCount> time while fetching company id by company name
        And findIdByCompanyName function will call <findIdByCompanyNameFunctionCallCount> time while fetching company id by company name

        Examples:
            | companyName | accessToken       | companyId | companyExistsResult | createCompanyExistByNameFunctionCallCount | findIdByCompanyNameFunctionCallCount |
            | rapidops    | GRBRm348xu43u94rx | 1         | 1                   | 1                                         | 1                                    |

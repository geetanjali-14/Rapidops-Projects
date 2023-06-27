Feature: get company Email By CompanyId

    Scenario Outline: Try to get company Email By CompanyId with empty details, then it will throw error.
        Given company details companyId: "<companyId>" to get company Email By CompanyId
        When Try to get company Email By CompanyId
        Then It will throw error: "<error>" with message: "<message>" while to get company Email By CompanyId
        And companyEmailByCompanyId function will call <companyEmailByCompanyIdFunctionCallCount> time while to get company Email By CompanyId

        Examples:
            | companyId | companyEmailByCompanyIdFunctionCallCount | error           | message                   |
            |           | 0                                        | ValidationError | '"companyId" is required' |

    Scenario Outline: Try to get company Email By CompanyId with valid inputs
        Given company details companyId: "<companyId>" to get company Email By CompanyId
        When Try to get company Email By CompanyId
        Then It will get company Email: "<companyEmail>"
        And companyEmailByCompanyId function will call <companyEmailByCompanyIdFunctionCallCount> time while to get company Email By CompanyId

        Examples:
            | companyId | companyEmail           | companyEmailByCompanyIdFunctionCallCount |
            | 1         | geetanjali@gmail.com | 1                                        |
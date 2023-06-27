Feature: Delete Company

    Scenario Outline: Try to delete company with empty details, then it will throw error.
        Given Company details companyId: "<companyId>" to delete company
        When Try to delete company
        Then It will throw error: "<error>" with message: "<message>" while deleting company
        And createCompanyExist function will call <createCompanyExistFunctionCallCount> time while deleting company
        And deleteCompany function will call <deleteCompanyFunctionCallCount> time while deleting company
        Examples:
            | companyId | deleteCompanyFunctionCallCount | createCompanyExistFunctionCallCount | error           | message                   |
            |           | 0                              | 0                                   | ValidationError | '"companyId" is required' |

    Scenario Outline: Try to create company with valid inputs
        Given Company details companyId: "<companyId>" to delete company
        When Try to delete company
        Then It will delete company with details: <deletedCompanyDetails>
        And createCompanyExist function will call <createCompanyExistFunctionCallCount> time while deleting company
        And deleteCompany function will call <deleteCompanyFunctionCallCount> time while deleting company

        Examples:
            | companyId | deletedCompanyDetails | createCompanyExistFunctionCallCount | deleteCompanyFunctionCallCount |
            | 1         | 1                     | 1                                   | 1                              |
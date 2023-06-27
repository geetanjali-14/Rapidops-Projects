Feature: Create Company

    Scenario Outline: Try to create company with empty details, then it will throw error.
        Given Company details companyName: "<companyName>", companyEmail: "<companyEmail>" and address:"<address>" to create company
        When Try to create company
        Then It will throw error: "<error>" with message: "<message>" while creating company
        And createCompanyExistByName function will call <createCompanyExistByNameFunctionCallCount> time while creating company
        And createCompany function will call <createCompanyFunctionCallCount> time while creating company
        Examples:
            | companyName | companyEmail         | address | createCompanyExistByNameFunctionCallCount | createCompanyFunctionCallCount | error           | message                                |
            |             |                      |         | 0                                         | 0                              | ValidationError | '"companyName" is required'            |
            | rapidops    |                      |         | 0                                         | 0                              | ValidationError | '"companyEmail" is required'           |
            | rapidops    | qkjswqzme            |         | 0                                         | 0                              | ValidationError | '"companyEmail" must be a valid email' |
            | rapidops    | geetanjali@gmail.com |         | 0                                         | 0                              | ValidationError | '"address" is required'                |

Scenario Outline: Try to create company with valid inputs
    Given Company details companyName: "<companyName>", companyEmail: "<companyEmail>" and address:"<address>" to create company
    When Try to create company
    Then It will create company with details: <newCompanyDetails>
    And createCompanyExistByName function will call <createCompanyExistByNameFunctionCallCount> time while creating company
    And createCompany function will call <createCompanyFunctionCallCount> time while creating company

    Examples:
        | companyName | companyEmail         | address | newCompanyDetails | createCompanyExistByNameFunctionCallCount | createCompanyFunctionCallCount |
        | rapidops    | geetanjali@gmail.com | Gujrat  | 1                 | 1                                         | 1                              |

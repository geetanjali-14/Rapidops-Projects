Feature: Create New company

    Scenario Outline: Try to create new company with empty details, then it will throw error.
        Given company details company_name: "<company_name>", address: "<address>" and database_name: "<database_name>" to create new company
        When Try to create new company
        Then It will throw error: "<error>" with message: "<message>" while creating new company with empty fields
        And createcompany function will call <createcompanyFunctionCallCount> time while creating new company
        And companyExists function will call <companyExistsCallCount> time while creating new company

        Examples:
            | company_name | address | database_name | createcompanyFunctionCallCount | companyExistsCallCount | error           | message                       |
            |              |         |               | 0                              | 0                      | ValidationError | '"company_name" is required'  |
            | Rapidops     |         |               | 0                              | 0                      | ValidationError | '"address" is required'       |
            | Rapidops     | Delhi   |               | 0                              | 0                      | ValidationError | '"database_name" is required' |

    Scenario Outline: Try to create new company with invalid details, then it will throw error.
        Given company details company_name: "<company_name>", address: "<address>" and database_name: "<database_name>" to create new company
        When Try to create new company
        Then It will throw error: "<error>" with message: "<message>" while creating new company with wrong fields
        And createcompany function will call <createcompanyFunctionCallCount> time while creating new company
        And companyExists function will call <companyExistsCallCount> time while creating new company

        Examples:
            | company_name | address | database_name | createcompanyFunctionCallCount | companyExistsCallCount | error           | message                            |
            | 21           | Delhi   | company       | 0                              | 0                      | ValidationError | '"company_name" must be a string'  |
            | Rapidops     | 1       | company       | 0                              | 0                      | ValidationError | '"company_name" must be a string'  |
            | Rapidops     | Delhi   | 4             | 0                              | 0                      | ValidationError | '"database_name" must be a string' |


    Scenario Outline: Try to create new company with non-existing company, then it will throw error.
        Given company details company_name: "<company_name>", address: "<address>" and database_name: "<database_name>" to create new company
        And Company Exists returns result is: <companyExistsDetails>
        When Try to create new company
        Then It will throw error: "<error>" with message: "<message>" while creating new company when company entered does not exist
        And createcompany function will call <createcompanyFunctionCallCount> time while creating new company
        And companyExists function will call <companyExistsCallCount> time while creating new company

        Examples:
            | company_name | address | database_name | companyExistsDetails | createcompanyFunctionCallCount | companyExistsCallCount | error          | message                                 |
            | Rapidops     | Delhi   | company       | 0                    | 0                              | 1                      | ForbiddenError | "Company with this name does not exist" |


    Scenario Outline: Try to create new company with valid inputs
        Given company details company_name: "<company_name>", address: "<address>" and database_name: "<database_name>" to create new company
        And Company Exists returns result is: <companyExistsDetails>
        When Try to create new company
        Then It will create new company with details: "<newcompanyDetails>"
        And createcompany function will call <createcompanyFunctionCallCount> time while creating new company
        And companyExists function will call <companyExistsCallCount> time while creating new company

        Examples:
            | company_name | address | database_name | companyExistsDetails | newcompanyDetails | createcompanyFunctionCallCount | companyExistsCallCount |
            | Rapidops     | Delhi   | company       | 1                    | {"company_id": 1} | 1                              | 1                      |

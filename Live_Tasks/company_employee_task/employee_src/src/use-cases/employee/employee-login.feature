Feature: Logging in Employee

    # Scenario Outline: Try to login employee with empty details, then it will throw error.
    #     Given Employee details employeeEmail: "<employeeEmail>", password: "<password>" to login employee
    #     When Try to login employee
    #     Then It will throw error: "<error>" with message: "<message>" to login employee
    #     Examples:
    #         | employeeEmail        | password | employeeEmailExistsFunctionCallCount | getEmployeeIdByEmployeeEmailFunctionCallCount | isVerifiedEmployeeFunctionCallCount | generateAccessTokenFunctionCallCount | authenticateEmployeeFunctionCallCount | error           | message                                                |
    #         |                      |          | 0                                    | 0                                             | 0                                   | 0                                    | 0                                     | ValidationError | '"employeeEmail" is required'                          |
    #         | geetanjali           |          | 0                                    | 0                                             | 0                                   | 0                                    | 0                                     | ValidationError | '"employeeEmail" must be a valid email'                |
    #         | geetanjali@gmail.com |          | 0                                    | 0                                             | 0                                   | 0                                    | 0                                     | ValidationError | '"password" is required'                               |
    #         | geetanjali@gmail.com | 123      | 0                                    | 0                                             | 0                                   | 0                                    | 0                                     | ValidationError | '"password" length must be at least 6 characters long' |


    # Scenario Outline: Try to login employee when employee's email does not exists, then it will throw error.
# ............     Given Employee details employeeEmail: "<employeeEmail>", password: "<password>" to login employee
    #     When Try to login employee
    #     And Employee Email Exists employeeEmail: "<employeeEmail>" to login employee
    #     Then It will throw error: "<error>" with message: "<message>" to login employee
    #     And employeeEmailExists function will call <employeeEmailExistsFunctionCallCount> time to login employee

    #     Examples:
    #         | employeeEmail        | password   | employeeEmailExistsFunctionCallCount | getEmployeeIdByEmployeeEmailFunctionCallCount | isVerifiedEmployeeFunctionCallCount | generateAccessTokenFunctionCallCount | authenticateEmployeeFunctionCallCount | error               | message                   |
    #         | geetanjali@gmail.com | 123rfrrfx3 | 1                                    | 0                                             | 0                                   | 0                                    | 0                                     | ObjectNotFoundError | "Employee does not exist" |

# Scenario Outline: Try to login employee when employee is unverified
#     Given Employee details employeeEmail: "<employeeEmail>", password: "<password>" to login employee
#     When Try to login employee
#     And Employee is verified employeeId: "<employeeId>" to login employee
#     And isVerifiedEmployee function will call <isVerifiedEmployeeFunctionCallCount> time to login employee

#     Examples:
#         | employeeEmail        | password   | employeeEmailExistsFunctionCallCount | getEmployeeIdByEmployeeEmailFunctionCallCount | isVerifiedEmployeeFunctionCallCount | generateAccessTokenFunctionCallCount | authenticateEmployeeFunctionCallCount | error              | message                           |
#         | geetanjali@gmail.com | 123rfrrfx3 | 1                                    | 1                                             | 1                                   | 0                                    | 0                                     | InvalidAccessError | "Employee is not a verified user" |

# Scenario Outline: Try to get employeeId By employeeEmail
#     Given Employee details employeeEmail: "<employeeEmail>", password: "<password>" to login employee
#     When Try to login employee
#     And Get Employee ID by Email employeeEmail: "<employeeEmail>" to login employee
#     And getEmployeeIdByEmployeeEmail function will call <getEmployeeIdByEmployeeEmailFunctionCallCount> time to login employee

#     Examples:
#         | employeeEmail        | password   | employeeEmailExistsFunctionCallCount | getEmployeeIdByEmployeeEmailFunctionCallCount | isVerifiedEmployeeFunctionCallCount | generateAccessTokenFunctionCallCount | authenticateEmployeeFunctionCallCount | employeeId |
#         | geetanjali@gmail.com | 123rfrrfx3 | 1                                    | 1                                             | 0                                   | 0                                    | 0                                     | 1          |


# Scenario Outline: Try to login employee when employee is details are correct
# ...........    Given Employee details employeeEmail: "<employeeEmail>", password: "<password>" to login employee
#     When Try to login employee
#     Then It will login employee: <employeeDetails>
#     And isVerifiedEmployee function will call <isVerifiedEmployeeFunctionCallCount> time to login employee

#     Examples:
#         | employeeEmail        | password   | employeeEmailExistsFunctionCallCount | getEmployeeIdByEmployeeEmailFunctionCallCount | isVerifiedEmployeeFunctionCallCount | generateAccessTokenFunctionCallCount | authenticateEmployeeFunctionCallCount | employeeDetails |
#         | geetanjali@gmail.com | 123rfrrfx3 | 1                                    | 1                                             | 1                                   | 0                                    | 1                                     | 1               |

# Scenario Outline: Try to generate Access Token
#...........     Given Employee details employeeEmail: "<employeeEmail>", password: "<password>" to login employee
#     When Try to login employee
#     And Generate Access Token accessToken: "<accessToken>" to login employee
#     Then It will return accessToken: "<accessToken>"
#     And generateAccessToken function will call <generateAccessTokenFunctionCallCount> time to login employee

#     Examples:
#         | employeeEmail        | password   | employeeEmailExistsFunctionCallCount | getEmployeeIdByEmployeeEmailFunctionCallCount | isVerifiedEmployeeFunctionCallCount | generateAccessTokenFunctionCallCount | authenticateEmployeeFunctionCallCount | accessToken     |
#         | geetanjali@gmail.com | 123rfrrfx3 | 1                                    | 1                                             | 1                                   | 1                                    | 0                                     | { accessToken: "six8487xnry4ryc" } |

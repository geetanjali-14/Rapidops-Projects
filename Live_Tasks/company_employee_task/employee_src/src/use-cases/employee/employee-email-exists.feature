# Feature: checking employee email existence

#     Scenario Outline: Try to check employee email existence with invalid details, then it will throw an error.
#         Given Employee details employeeEmail: "<employeeEmail>" to check employee email existence
#         When Try to check employee email existence
#         Then It will throw error: "<error>" with message: "<message>" while try checking employee email existence
#         And employeeEmailExists function will call <employeeEmailExistsFunctionCallCount> time while try to check employee email existence

#         Examples:
#             | employeeEmail | employeeEmailExistsFunctionCallCount | error           | message                                         |
#             |               | 0                                    | ValidationError | '"employeeEmail" is required'                   |
#             # | geetanjali    | 0                                    | ValidationError | '"employeeEmail" must be a valid email address' |

#     # Scenario Outline: Try to check employee email existence with valid inputs.
#     #     Given Employee details employeeEmail: "<employeeEmail>" to check employee email existence
#     #     When Try to check employee email existence
#     #     Then It will check employee email existence with details: <employeeExistsResult>
#     #     And employeeEmailExists function will call <employeeEmailExistsFunctionCallCount> time while try to check employee email existence

#     #     Examples:
#     #         | employeeEmail        | employeeExistsResult | employeeEmailExistsFunctionCallCount |
#     #         | geetanjali@gmail.com | 1                    | 1                                    |
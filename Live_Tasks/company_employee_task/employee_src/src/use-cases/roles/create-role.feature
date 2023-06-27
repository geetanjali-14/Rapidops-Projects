# Feature: Create New Role

#     Scenario Outline: Try to create new role with empty details, then it will throw error.
#         Given role details name: "<name>", permissions: "<permissions>",companyId: "<companyId>",isMaster: "<isMaster>", accessToken: "<accessToken>", password: "<password>" to create new role
#         When Try to create new role
#         Then It will throw error: "<error>" with message: "<message>" while creating new role

#         Examples:
#             | name  | permissions                                                | companyId | isMaster | accessToken | createRoleFunctionCallCount | error           | message                     |
#             |       |                                                            |           |          |             | 0                           | ValidationError | '"name" is required'        |
#             | admin |                                                            |           |          |             | 0                           | ValidationError | '"permissions" is required' |
#             | admin | {"employee": ["read", "create"],"accessToken": ["update"]} |           |          |             | 0                           | ValidationError | '"companyId" is required'   |
#             | admin | {"employee": ["read", "create"],"accessToken": ["update"]} | 2         |          |             | 0                           | ValidationError | '"isMaster" is required'    |
#             | admin | {"employee": ["read", "create"],"accessToken": ["update"]} | 2         | 1        |             | 0                           | ValidationError | '"accessToken" is required' |

#     Scenario Outline: Try to create new role with valid inputs
#         Given role details name: "<name>", permissions: "<permissions>",companyId: "<companyId>",isMaster: "<isMaster>", accessToken: "<accessToken>" to create new role
#         When Try to create new role
#         Then It will create new role with details: <newRoleID>
#         And createRole function will call <createRoleFunctionCallCount> time while creating new role

#         Examples:
#             | name  | permissions                                                | companyId | isMaster | accessToken       | newRoleID | createRoleFunctionCallCount |
#             | admin | {"employee": ["read", "create"],"accessToken": ["update"]} | 2         | 1        | 328nxry3mrz287cny | 1         | 1                           |
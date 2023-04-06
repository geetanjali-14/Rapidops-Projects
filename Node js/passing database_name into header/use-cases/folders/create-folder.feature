Feature: Create New Folder.

    Scenario Outline: Try to create new folder with invalid details, then it will throw error.
        Given Folder details user_id:"<user_id>" and name: "<name>" to create new folder
        When Try to create new folder
        Then It will throw error: "<error>" with message: "<message>" while creating new folder
        And createFolder function will call <createFolderFunctionCallCount> time while creating new Folder

        Examples:
            | user_id | name  | createFolderFunctionCallCount | error | message                   |
            |         |       | 0                             | Error | '"user_id" is required'   |
            | 1       |       | 0                             | Error | '"name" is required'      |
            | a       |       | 0                             | Error | "\"user_id\" must be a number" |
            | a       | inbox | 0                             | Error | "\"user_id\" must be a number" |

    Scenario Outline: Try to create new folder with valid inputs, then it will throw error.
        Given Folder details user_id:"<user_id>" and name: "<name>" to create new folder
        When Try to create new folder
        Then It will create new folder with details: "<newFolderDetails>"
        And createFolder function will call <createFolderFunctionCallCount> time while creating new Folder

        Examples:
            | user_id | name  | newFolderDetails | createFolderFunctionCallCount |
            | 1       | inbox | '{"id": 1}'      | 1                             |
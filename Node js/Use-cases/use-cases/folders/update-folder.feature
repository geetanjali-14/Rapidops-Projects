Feature: Update Folder.

    Scenario Outline: Try to update folder with invalid details, then it will throw error.
        Given Folder details folder_id: "<folder_id>", name: "<name>" to update folder
        When Try to update folder
        Then It will throw error: "<error>" with message: "<message>" while updating folder
        And updateFolder function will call <updateFolderFunctionCallCount> time while updating folder

        Examples:
            | folder_id | name  | updateFolderFunctionCallCount | error | message                        |
            |           |       | 0                             | Error | '"folder_id" is required'      |
            | 1         |       | 0                             | Error | '"name" is required'           |
            |           | inbox | 0                             | Error | '"folder_id" is required'      |
            | a         |       | 0                             | Error | '"folder_id" must be a number' |
            | a         | inbox | 0                             | Error | '"folder_id" must be a number' |


    Scenario Outline: Try to update folder with valid details, then it will throw error.
        Given Folder details folder_id: "<folder_id>", name: "<name>" to update folder
        When Try to update folder
        Then It will update folder with details: <updateResult>
        And updateFolder function will call <updateFolderFunctionCallCount> time while updating folder

        Examples:
            | folder_id | name  | updateResult | updateFolderFunctionCallCount |
            | 1        | trash | '{"id": 1}'  | 1                             |
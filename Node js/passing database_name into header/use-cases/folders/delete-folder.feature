Feature: Delete Folder.

    Scenario Outline: Try to delete folder with invalid details, then it will throw error.
        Given Folder details folder_id: "<folder_id>" to delete folder
        When Try to delete folder
        Then It will throw error: "<error>" with message: "<message>" while deleting folder
        And deleteFolder function will call <deleteFolderFunctionCallCount> time while deleting folder

        Examples:
            | folder_id | deleteFolderFunctionCallCount | error | message                        |
            |           | 0                             | Error | '"folder_id" is required'      |
            | a         | 0                             | Error | '"folder_id" must be a number' |

    Scenario Outline: Try to delete folder with valid inputs.
        Given Folder details folder_id: "<folder_id>" to delete folder
        When Try to delete folder
        Then It will delete folder with details: <deletedFolderDetails>
        And deleteFolder function will call <deletefolderFunctionCallCount> time while deleting folder

        Examples:
            | folder_id | deletedFolderDetails | deletefolderFunctionCallCount |
            | 1         | 1                    | 1                             |

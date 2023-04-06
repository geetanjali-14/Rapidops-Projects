Feature: Find folder by folder_id.

    Scenario Outline: Try to find folder with invalid details, then it will throw error.
        Given Find folder with folder_id: "<folder_id>"
        When Try to find folder with folder_id
        Then It will throw error: "<error>" with message: <message> while finding folder
        And folderExistsByFolderId function will call <findFolderFunctionCallCount> time while finding folder

        Examples:
            | folder_id | findFolderFunctionCallCount | error | message                        |
            |           | 0                           | Error | '"folder_id" is required'      |
            | a         | 0                           | Error | '"folder_id" must be a number' |
            | #         | 0                           | Error | '"folder_id" must be a number' |

    Scenario Outline: Try to find folder with valid details, then it will throw error.
        Given Find folder with folder_id: "<folder_id>"
        When Try to find folder with folder_id
        Then It will give folder with details: <folderDetails>
        And folderExistsByFolderId function will call <findFolderFunctionCallCount> time while finding folder

        Examples:
            | folder_id | folderDetails | findFolderFunctionCallCount |
            | 1         | 1             | 1                           |

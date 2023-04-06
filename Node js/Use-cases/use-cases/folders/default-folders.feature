Feature: Creating Default Folder.

    Scenario Outline: Try to create user default folder with invalid id, then it will throw error.
        Given Folder details id: "<id>" to create folder
        When Try to create default folder
        Then It will throw error: "<error>" with message: <message> while creating default folders by id
        And defaultFolders function will call <defaultFolderFunctionCallCount> time while creating default folders

        Examples:
            | id | defaultFolderFunctionCallCount | error | message                   |
            |    | 0                              | Error | '"id" is required'        |
            | a  | 0                              | Error | "\"id\" must be a number" |

    Scenario Outline: Try to create user default folder with valid id, then it will throw error.
        Given Folder details id: "<id>" to create folder
        When Try to create default folder
        Then It will get folder with details: <result>
        And defaultFolders function will call <defaultFolderFunctionCallCount> time while creating default folders

        Examples:
            | id | result | defaultFolderFunctionCallCount |
            | 1  | 1      | 1                              |
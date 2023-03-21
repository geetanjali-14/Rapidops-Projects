Feature: Get Folder By ID.

    Scenario Outline: Try to get folder with invalid id, then it will throw error.
        Given Folder details id: "<id>" to get folder details
        When Try to get folder details
        Then It will throw error: "<error>" with message: "<message>" while getting folder by id
        And getFolderById function will call <getFolderByIdFunctionCallCount> time while getting folder details

        Examples:
            | id | getFolderByIdFunctionCallCount | error | message                   |
            |    | 0                            | Error | '"id" is required'        |
            | a  | 0                            | Error | "\"id\" must be a number" |

    Scenario Outline: Try to get folder with valid id, then it will throw error.
        Given Folder details id: "<id>" to get folder details
        When Try to get folder details
        Then It will get folder with details: <folderDetails>
        And getFolderById function will call <getFolderByIdFunctionCallCount> time while getting folder details

        Examples:
            | id | folderDetails | getFolderByIdFunctionCallCount |
            | 1  | '{"id":1}'  | 1                            |

Feature: Find Folder exist or not.

    Scenario Outline: Try to find that folder exists with invalid details, then it will throw error.
        Given Folder details user_id: "<user_id>" and name: "<name>" to find folder existence
        When Try to find folder existence
        Then It will throw error: "<error>" with message: <message> while finding folder existence
        And folderExists function will call <folderExistsFunctionCallCount> time while finding folder

        Examples:
            | user_id | name  | folderExistsFunctionCallCount | error | message                      |
            |         |       | 0                             | Error | '"user_id" is required'      |
            |         | inbox | 0                             | Error | '"user_id" is required'      |
            | a       |       | 0                             | Error | '"user_id" must be a number' |
            | %       |       | 0                             | Error | '"user_id" must be a number' |
            | a       | inbox | 0                             | Error | '"user_id" must be a number' |
            | 1       |       | 0                             | Error | '"name" is required'         |



    Scenario Outline: Try to find that folder exists with valid details.
        Given Folder details user_id: "<user_id>" and name: "<name>" to find folder existence
        When Try to find folder existence
        Then It will find folder with details: <folderExists>
        And folderExists function will call <folderExistsFunctionCallCount> time while finding folder

        Examples:
            | user_id | name  | folderExists | folderExistsFunctionCallCount |
            | 23      | inbox | 1            | 1                             |
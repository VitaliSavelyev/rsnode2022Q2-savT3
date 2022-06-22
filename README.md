# rsnode2022Q2-savT3
# CRUD-API
## Instruction:
1. Clone repo:
 ``` powershell 
git@github.com:VitaliSavelyev/rsnode2022Q2-savT3.git -b task3
```
2. To install all dependencies use npm install in the root folder (CRUD-API)
``` powershell 
npm install
```
3) Run ```npm run start:dev``` to start application in development mode or ```npm run start:prod``` to start application in production mode.
   To use horizontal scaling for application run ```npm run start:multi```.

## Commands
- GET /users is used to get all persons
- GET /users/${userId} is used to get user by userId
- PUT /users/{userId} is used to update existing user
- DELETE /users/${userId} is used to delete existing user from database

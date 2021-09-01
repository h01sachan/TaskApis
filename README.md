# Instructions to run locally on your machine
1. Clone this Repo
2. Create a folder named `config` within the newly cloned repo directory and add the following three files : 
```
    default.json
    dev.json
    test.json
```
3. In config dev.json AND default.json add 
```
{ "MONGO_URI": "YOUR_DB_URI FOR DEVELOPMENT" }
```
4. In config test.json
```
{ "MONGO_URI": "YOUR_DB_URI FOR TESTING" }
```
5. In your terminal run `npm i` to install dependencies
6. To start server run `npm start` in your terminal

# Postman Collection Link
https://www.getpostman.com/collections/3ec60c0b5dbd6c96a330

# Heroku Server Link
https://task-apis.herokuapp.com/

# Apis
1. To create report
```
https://task-apis.herokuapp.com/api/report
```
2. To get reports
```
https://task-apis.herokuapp.com/api/report?reportID=612bcc50e62f1d0016c1e6f6
```





# FlightMatch
Winter 2023 CS35L project. Web app to match people to split a rideshare based on flight arrival time at LAX.

**********************************************************
Instructions for running server:
create a file called config.env with the following code and put it into the flightmatch/server folder

```
ATLAS_URI=mongodb+srv://<user>:<password>@cluster0.lgu1nqk.mongodb.net/?retryWrites=true&w=majority
PORT=5001
```

Note*
Normally we would not allow unwanted/unauthorized people on our server but since this is a not an official website so we will provide an example login to replace the user and password. You can use these credentials in your config.env file:
- for \<user\> use: sliebs
- for \<password\>use :  FlightMatch

```
ATLAS_URI=mongodb+srv://example:FlightMatch@cluster0.lgu1nqk.mongodb.net/?retryWrites=true&w=majority
PORT=5001
```

You can access your username and password by logging in to the MongoDB Flight Match project page at this website: https://www.mongodb.com/cloud 


then run these commands:
1. cd flightmatch
2. cd server
3. npm install
4. node server.js

*Note- there may be an issue with deprecated packages. To run MongoDB, there should be no deprecated packages and you might need to run the command npm audit fix and/or npm audit fix --force to get rid of them

**********************************************************
Instructions for running client (in a separate terminal, meaning you have two terminal windows open at once):
run these commands:
1. cd flightmatch
2. cd client
3. npm install
4. npm start

*Note- there may be an issue with deprecated packages, and you might need to run the command npm audit fix and/or npm audit fix --force to get rid of them. However, if there are 5-7 deprecated packages, don't worry about those, the web app still works fine.

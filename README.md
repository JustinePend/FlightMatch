# FlightMatch
Winter 2023 CS35L project. Web app to match people to split a rideshare based on flight arrival time at LAX.

**********************************************************
Instructions for running server:
create a file called config.env with the following

ATLAS_URI=mongodb+srv://<user>:<password>@cluster0.lgu1nqk.mongodb.net/?retryWrites=true&w=majority

PORT=5001


then run these commands:
1. cd flightmatch
2. cd server
3. npm install
4. node server.js

**********************************************************
Instructions for running client:
run these commands:
1. cd flightmatch
2. cd client
3. npm install
4. npm start

*Note- there may be an issue with deprecated packages, and you might need to run the command npm audit fix and/or npm audit fix --force

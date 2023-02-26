# FlightMatch
Winter 2023 CS35L project. Web app to match people to split a rideshare based on flight arrival time at LAX.

**********************************************************
Instructions for running server:
create a file called config.env with the following

ATLAS_URI=mongodb+srv://<user>:<password>@cluster0.lgu1nqk.mongodb.net/?retryWrites=true&w=majority
PORT=5000


then run these commands:
cd flightmatch
cd server
npm install
node server.js

**********************************************************
Instructions for running client:
run these commands:
cd flightmatch
cd client
npm install
npm start

*Note- there may be an issue with deprecated packages, and you might need to run the command npm audit fix and/or npm audit fix --force

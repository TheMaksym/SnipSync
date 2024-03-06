Here is the guide on how to run the backend portion of ReadMe.md

First follow installation instructions
CD into /BackEnd/
Run using node --env-file=config.env backend
You can also debug using node (launch.json has a configuration for backend specifically)

Our DB is on MongoDB Atlas
Creds are stored in config.env

backend.js initiates the program
records.js is an API router, accesses collections
connection.js connects to the DB

MongoDB Atlas Schema goes Cluster(Server)->DB->Collection(Table)



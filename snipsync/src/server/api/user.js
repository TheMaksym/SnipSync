const express = require ( "express");

// This will help us connect to the database
const db = require ( "../db/connection.js");

// This help convert the id = require ( string to ObjectId for the _id.
const { ObjectId }  = require("mongodb");

//This will be used for hashing passwords
const crypto = require ( "crypto");
const { isBuffer } = require ( "util");
const { Console } = require ( "console");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
const secret = "AnnieIsTheBestTA"
// This section will list all user info
router.get("/", async (req, res) => {
  let collection = await db.collection("User");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by username
router.get("/Single/:username", async (req, res) => {
  let collection = await db.collection("User");
  let query = { username: req.params.username };
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/validate/", async(req, res) => {
  try{
    let collection = await db.collection("User"); 
    let checkQuery = {username : req.body.username};
    let checkName = await collection.findOne(checkQuery);
    const hashedPass = crypto.createHmac('sha256', secret)
    .update(req.body.password)
    .digest('hex');
    if(checkName == undefined){
      res.status(403).send("USER DOES NOT EXIST");
    }
    else if(hashedPass == checkName.password){
      res.status(200).send("VALIDATED");
    }
    else{
      res.status(403).send("DENIED");
    }
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error validating record");
  }
});

// This section will help you create a new profile
router.post("/Create/", async (req, res) => {
  try {
    let newDocument = {
      username: req.body.username,
      password: crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex'),
      email: req.body.email,
      twitch_token: "",
      youtube_token: ""
    };
    

    let collection = await db.collection("User");

    let checkQuery = {username : req.body.username};
    let checkName = await collection.findOne(checkQuery);
    if(checkName){
      res.status(403).send("Username exists already");
      return;
    }


    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/Single/:username", async (req, res) => {
  try {
    const query = { username: req.params.username };
    const updates = {
      $set: {
          password : req.body.password,
          accountName: req.body.accountName
      },
    };

    let collection = await db.collection("User");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/Single/:username", async (req, res) => {
  try {
    const query = { username : req.params.username };

    const collection = db.collection("User");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

router.patch("/Single/Twitch/:username", async (req, res) => {
  try {
    const query = { username: req.params.username };
    const updates = {
      $set: {
          twitch_token: req.body.twitch_token
      },
    };

    let collection = await db.collection("User");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

router.patch("/Single/Youtube/:username", async (req, res) => {
  try {
    const query = { username: req.params.username };
    const updates = {
      $set: {
          youtube_token: req.body.youtube_token
      },
    };

    let collection = await db.collection("User");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});
router.get("/Single/Twitch/:username", async (req, res) => {
  try {
    const query = { username: req.params.username };

    let collection = await db.collection("User");
    let result = await collection.findOne(query);
    if(result.twitch_id !== undefined){
      res.send(result.twitch_id).status(200);
    }
    else{
      res.status(400).send("MissingTwitchID");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error finding record");
  }
});

//update user comments
router.patch("/Single/comments/:username", async(req,res) => {
  const query = { username: req.params.username };
  const updates = {
    $push: { 
      Comments: req.body.comments
    },
  };
  let collection = await db.collection("User");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
})

//update user likes
router.patch("/Single/likes/:username", async(req,res) => {
  const query = { username: req.params.username };
  const updates = {
    $push: { 
      Likes : req.body.likes
    },
  };
  let collection = await db.collection("User");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
})
module.exports = router;
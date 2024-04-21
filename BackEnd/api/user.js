import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

//This will be used for hashing passwords
import crypto from "crypto";
import { isBuffer } from "util";
import { Console } from "console";

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
    if(hashedPass == checkName.password){
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

// This section will help you create a new record.
router.post("/Create/", async (req, res) => {
  try {
    let newDocument = {
      username: req.body.username,
      password: crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex'),
      accountName: req.body.accountName,
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
          twitch_id: req.body.twitch_id
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

export default router;
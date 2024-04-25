const express = require("express");
const db = require("../db/connection.js");
const { ObjectId } = require("mongodb");
const router = express.Router();

//get all posts
router.get("/", async (req, res) => {
  let collection = await db.collection("Posts");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});
//Get specific post by ID
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Posts");
  let query = { _id: req.params.id };
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(200);
  else res.send(result).status(200);
});
//create new post
router.post("/", async (req, res) => {
  let newPost = {
    _id: req.body.id,
    Title: req.body.title,
    Comments: req.body.comments,
    Likes: req.body.likes,
    Author :req.body.author
  };

  let collection = await db.collection("Posts");
  let result = await collection.insertOne(newPost);
  res.send(result).status(204);
});

//Update post comments
router.patch("/comments/:id", async (req, res) => {
  const query = { _id: req.params.id };
  const updates = {
    $push: { 
      Comments: req.body.comments
    },
  };
  let collection = await db.collection("Posts");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

//Update post likes
router.patch("/likes/:id", async (req, res) => {
  const query = { _id: req.params.id };
  const updates = {
    $set: {
        Likes : req.body.likes
    },
  };
  let collection = await db.collection("Posts");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

module.exports = router;

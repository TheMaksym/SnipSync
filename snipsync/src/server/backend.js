const express = require("express");
const cors = require("cors");
const user = require("./api/user.js");
const twitch = require("./api/twitch.js");
const youtube = require("./api/youtube.js");
const post = require("./api/post.js");
const dotenv = require('dotenv').config({path:__dirname+"/.env.local"});

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", user);
app.use("/twitch", twitch);
app.use("/youtube", youtube);
app.use("/post", post)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

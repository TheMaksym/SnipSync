import express from "express";
import cors from "cors";
import user from "./api/user.js";
import twitch from "./api/twitch.js";
import youtube from "./api/youtube.js";

const PORT = process.env.PORT || 5050;
const app = express();
const youtubeAPIKey = "AIzaSyAk5p9ZqHTXeXUGGWTpN4F9tJzKYaugm7s"

app.use(cors());
app.use(express.json());
app.use("/user", user);
app.use("/twitch", twitch);
app.use("/youtube", youtube);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);  
});
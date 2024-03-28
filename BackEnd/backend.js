import express from "express";
import cors from "cors";
import user from "./api/user.js";
//Used to fetch data and get console input
import fetch from "node-fetch";
import readline from 'readline';
import twitch from "./api/twitch.js";

const PORT = process.env.PORT || 5050;
const app = express();
const youtubeAPIKey = "AIzaSyAk5p9ZqHTXeXUGGWTpN4F9tJzKYaugm7s"

app.use(cors());
app.use(express.json());
app.use("/user", user);
app.use("/twitch", twitch);

//Get youtube search string
async function querySearchString() {
  consoleIn.question('What do you want to search? ', (searchThis) => {
    fetchYouTubeSearch(searchThis);
    //consoleIn.close();
  });
}

//Try Fetching Data from Youtube
async function fetchYouTubeSearch(searchString) {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubeAPIKey}&q=${searchString}&type=video&part=snippet`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Youtube Fetch Success :):');
    console.log(JSON.stringify(data, null, 2)); 
    querySearchString();
  } catch (error) {
    console.error('Youtube Fetch FAILED :(');
  }
};

const consoleIn = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);  
  querySearchString();
});
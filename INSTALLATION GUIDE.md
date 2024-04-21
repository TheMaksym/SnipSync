Download the latest version of node.js 
https://nodejs.org/en

-then install packages through terminal 
"npm install -g npm next express cors mongodb"

-then check for the latest versions
node -v (Should be v20.11.1)
npm -v (Should be 10.4.0)

-to run the app, cd to 
./SnipSync/snipsync (should be within directory to where you can access files)
and run "npm run dev" in terminal

-ALTERNATIVE RUN GUIDE:
ok so you still have to do npm run dev in terminal, but while that is running in terminal you can go to the run icon on the left
and once you do that, you can click the dropdown for configuration FrontEnd/BackEnd
After that you should be able to re-run and debug front and backend simultaneously as much as you like
(I wrote launch instructions in .vscode/launch.json)

-Create a .env file for all of the required secrets / api keys
/Backend/config.env:

ATLAS_URI=
PORT=
TWITCH_SECRET=
TWITCH_CLIENT_ID=
YOUTUBE_API_KEY=
YOUTUBE_CLIENT_ID=


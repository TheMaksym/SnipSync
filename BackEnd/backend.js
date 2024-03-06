import express from "express";
import cors from "cors";
import user from "./api/user.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", user);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
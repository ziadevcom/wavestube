const express = require("express");
require("dotenv").config();

const app = express();
const port = 3000;

// Load Youtube API key
const YT_API_KEY = process.env.YT_API_KEY;
console.log(YT_API_KEY);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

const express = require("express");
// const axios = require("axios");

const port = process.env.PORT || 3000;
const app = express();
app.listen(port);

app.get("/youtube", (request, response) => {
  console.log("working");
  response.set("Access-Control-Allow-Origin", "*");
  response.send('e dey show o');
});

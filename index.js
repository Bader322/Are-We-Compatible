"use strict";
const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const port = process.env.PORT || 3000;
//Import the mongoose module
//Set up default mongoose connection

// set the view engine to ejs
app.use(express.urlencoded({ extended: false }));
// app.set("views", path.join(__dirname, "views"));
app.use(express.static("views"));
app.set("view engine", "ejs");
// End of set up

// index page
app.get("/", async (req, res) => {
  res.render("index");
});

// index page
app.post("/", async (req, res) => {
  const partnerNames = {
    fname: req.body.firstPartner,
    sname: req.body.secondPartner,
  };
  const options = {
    method: "GET",
    url: "https://love-calculator.p.rapidapi.com/getPercentage",
    params: partnerNames,
    headers: {
      "x-rapidapi-key": "77afbcc55fmsh1a6f00248ab8af5p101cb9jsn9fe77baa2dc8",
      "x-rapidapi-host": "love-calculator.p.rapidapi.com",
    },
  };
  try {
    const reqRes = await axios.request(options);
    const resultData = reqRes.data;
    console.log(resultData);
    res.render("index", { resultData: resultData });
  } catch (error) {
    res.render("index", { error: error });
  }
});

app.listen(port);
console.log(`Server is listening on port ${port}`);

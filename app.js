const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/homepage", (req, res) => {
  res.render("Homepage");
});
app.get("/", (req, res) => {
  res.redirect("/search");
});

app.get("/movies/:id", (req, res) => {
  // let mv = req.body.movie;
  let mv = req.body.movie;
  const api_key = process.env.API_KEY;
  const ids = req.params.id;
  let gt = `http://www.omdbapi.com/?i=${ids}&apikey=${api_key}`;

  fetch(`${gt}`)
    .then((data) => data.json())
    .then((moviedata) => {
      console.log(mv);
      console.log("inside get", moviedata);
      res.render("movies", { movie: moviedata });
    });
});

app.post("/results", (req, res) => {
  console.log(req.body.movie);
  let mv = req.body.movie;
  const api_key = process.env.API_KEY;

  console.log("mvs", mv);
  let gt = `http://www.omdbapi.com/?s=${mv}&apikey=${api_key}`;

  fetch(`${gt}`)
    .then((data) => data.json())
    .then((moviedata) => {
      console.log("inside moviedata", moviedata);
      res.render("Homepage", { movie: moviedata.Search });
    });
});
app.get("/search", (req, res) => {
  res.render("search");
});

app.listen(3000, (req, res) => {
  console.log("server is running on port 3000");
});

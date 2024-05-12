import("node-fetch").then(({ default: fetch }) => {
  const express = require("express");
  const app = express();
  const path = require("path");
  const port = process.env.PORT || 3000;
  // const fetch = require("node-fetch");

  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.static("public"));

  app.get("/homepage", (req, res) => {
    res.render("Homepage");
  });

  app.get("/movies/:id", (req, res) => {
    let mv = req.body.movie;

    const ids = req.params.id;
    let gt = `http://www.omdbapi.com/?i=${ids}&apikey=524df923`;

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
    console.log("mvs", mv);
    let gt = `http://www.omdbapi.com/?s=${mv}&apikey=524df923`;

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

  app.listen(port, (req, res) => {
    console.log("server is running on port 3000");
  });
});

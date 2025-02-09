const path = require("path");
const hbs = require("hbs");
const express = require("express");
const router = express.Router();
const serverless = require("serverless-http");

const geocode = require("../src/utils/geocode");
const weather = require("../src/utils/weather");

const PORT = process.env.PORT || 3000;
const app = express();

// Config handlebar
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// Setup static page directory
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/", router);

router.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sudhakar",
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sudhakar P",
  });
});

router.get("/help", (req, res) => {
  res.render("help", {
    msg: "This is your help text!",
    title: "Help",
    name: "Sudhakar P",
  });
});

router.get("/weather", (req, res) => {
  const location = req.query.loc;
  if (!location) {
    return res.send({
      error: "Must provide a location.",
    });
  }

  geocode(location, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    const coord = { lat: data.lat, lon: data.lon };
    weather(coord, (error, result) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        temperature: result.temperature,
        location: result.location,
        description: result.description,
      });
    });
  });
});

router.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "No help article found!",
    name: "Sudhakar P",
  });
});

router.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "Page not found",
    name: "Sudhakar P",
  });
});

module.exports.handler = serverless(app);

/*
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
*/

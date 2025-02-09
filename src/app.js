const path = require("path");
const hbs = require("hbs");
const express = require("express");

const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const PORT = process.env.PORT || 3000;
const app = express();

// Config handlebar
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// Setup static page directory
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sudhakar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sudhakar P",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "This is your help text!",
    title: "Help",
    name: "Sudhakar P",
  });
});

app.get("/weather", (req, res) => {
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

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "No help article found!",
    name: "Sudhakar P",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "Page not found",
    name: "Sudhakar P",
  });
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

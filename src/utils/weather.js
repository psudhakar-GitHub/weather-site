const axios = require("axios");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function weather(coord, callback) {
  if (!coord) {
    return "No coordinates found!";
  }

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=ed2b24670f5ebc46b763a912d6f32aa2`
    )
    .then((response) => {
      callback(null, {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        location: response.data.name,
      });
    })
    .catch((e) => {
      callback(e, undefined)
    });
}

module.exports = weather;

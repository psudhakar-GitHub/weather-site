const axios = require("axios");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function geocode(address, callback) {
  if (!address) {
    return "Please enter an address";
  }

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=ed2b24670f5ebc46b763a912d6f32aa2`
    )
    .then((response) => {
      callback(null, {
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
        loc: response.data.name,
      });
    })
    .catch((e) => {
      callback(e, undefined);
    });
}

module.exports = geocode;

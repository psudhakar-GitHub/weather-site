const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgSuccess = document.querySelector(".msg-success");
const msgError = document.querySelector(".msg-error");

msgError.textContent = '';
msgSuccess.textContent = '';

const getWeather = async (location) => {
  const res = await fetch("http://localhost:3000/weather?loc=" + location);
  const data = await res.json();

  if (data.error) {
    msgError.textContent = data.error;
    msgSuccess.textContent = '';
  } else {
    msgError.textContent = '';
    msgSuccess.textContent = `It is ${data.temperature} deg celsius at ${data.location}. Feels like ${data.description}.`;
  }
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(search.value);
});

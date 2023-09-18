const express = require("express");
const request = require("request");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs"); // Set EJS as the view engine

app.get("/", (req, res) => {
  // Replace 'YOUR_API_KEY' with an actual API key from a weather service provider
  const apiKey = "bea07a938abe2ed303593b462a30fb2f"; // Replace with your actual OpenWeatherMap API key
  const city = "New York"; // Replace with the desired city or location

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const weatherData = JSON.parse(body);
      console.log(weatherData);
      res.render("index", { weatherData }); // Render the EJS template
    } else {
      const errorHtml = "<p>Error fetching weather data.</p>";
      res.render("index", { errorHtml }); // Render the EJS template with an error
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

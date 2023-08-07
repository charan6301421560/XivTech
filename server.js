const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3005;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

const weatherAPIKey = '54cddf127dd721f81251664a18e3c0bf'; // Replace this with your actual API key

app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = {};
    
    const weatherRequests = cities.map(async (city) => {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`);
      const temperature = response.data.main.temp;
      console.log(temperature)
      weatherData[city] = `${temperature}°C`;
    });

    await Promise.all(weatherRequests);

    res.status(200).json({ weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

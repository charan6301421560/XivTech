document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherResults = document.getElementById('weatherResults');
  
    getWeatherBtn.addEventListener('click', async () => {
      const cities = cityInput.value.split(',').map(city => city.trim());
  
      try {
        const response = await fetch('http://localhost:3005/getWeather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cities }),
        });
  
        const data = await response.json();
        displayWeatherResults(data.weather);
      } catch (error) {
        console.error('Error fetching weather:', error);
        weatherResults.innerHTML = 'An error occurred while fetching weather data.';
      }
    });
  
    function displayWeatherResults(weatherData) {
      let resultHTML = '<h2>Weather Results:</h2>';
      for (const city in weatherData) {
        resultHTML += `<p>${city}: ${weatherData[city]}</p>`;
      }
      weatherResults.innerHTML = resultHTML;
    }
  });
  
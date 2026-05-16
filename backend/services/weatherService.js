const axios = require("axios");

const getWeatherData = async (lat, lon) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;

        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);

        return {
            success: true,

            location: response.data.name,

            temperature: response.data.main.temp,

            humidity: response.data.main.humidity,

            pressure: response.data.main.pressure,

            weatherCondition:
                response.data.weather[0].main,

            description:
                response.data.weather[0].description,

            windSpeed: response.data.wind.speed,

            rainfall:
                response.data.rain?.["1h"] || 0,
        };
    } catch (error) {
        console.log("Weather API Error:", error.message);

        return {
            success: false,
            message: "Unable to fetch weather data",
        };
    }
};

module.exports = getWeatherData;
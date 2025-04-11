const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City name is required" });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log("Requesting data from:", url); // Debugging

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch weather data", details: error.response ? error.response.data : error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

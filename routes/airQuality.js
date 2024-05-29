const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:city", async (req, res) => {
    try {
        const cityName = req.params.city;
        const apiUrl = `https://api.waqi.info/feed/${cityName}/?token=44d57c7f33b183667cd6a34550bc76e87291c683`;
        const response = await axios.get(apiUrl);
        const airQualityData = response.data;
        res.json(airQualityData);
    } catch(error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

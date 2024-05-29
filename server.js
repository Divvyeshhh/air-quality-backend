const express = require("express");
const app = express();
const port = 6969;

const airQualityRoutes = require("./routes/airQuality");

app.use("/api/air-quality", airQualityRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the AQI APP");
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cornRateLimiter = require("./rateLimiter");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
    methods: "GET,POST",
  })
);

app.use(express.json());
app.set("trust proxy", 1);

app.get("/api/", (req, res) => {
  res.status(200).json({
    message: "¡Welcome to Bob's corn API, use POST /buy-corn 🌽",
  });
});

app.post("/api/buy-corn", cornRateLimiter, (req, res) => {
  res.status(200).json({
    message: "¡Successful purchase! 🌽",
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

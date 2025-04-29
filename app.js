const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/error.middleware");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 Krishi Saathi Admin API is running!" });
});

app.use("/api/v1", routes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found!" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error!" });
});

app.use(errorHandler);
module.exports = app;

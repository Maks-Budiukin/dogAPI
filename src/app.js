const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");

const pingRouter = require("./routes/ping");
const dogsRouter = require("./routes/dogs");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/ping", pingRouter);
app.use("/", dogsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

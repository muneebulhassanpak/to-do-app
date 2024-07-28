require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/todoRoute");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDatabase = require("./utils/databaseconnection");

const app = express();

//Database Connection
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://www.postman.com/"],
    credentials: true,
  })
);

app.use("/api/task", userRoutes);

app.use((err, req, res, next) => {
  const errorCode = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorCode).json({
    success: false,
    message: errorMessage,
  });
});

const PORT = process.env.PORT || 3000;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});

mongoose.connection.on("error", () => {
  console.log(
    "Probably due to connection with the database server, Server closed"
  );
  process.exit(1);
});

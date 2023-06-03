const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const TodoModel = require("./models/todoSchema");
const router = require("./routes");

const DBURI = process.env.MONGODB_URI;
mongoose
  .connect(DBURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(cors()); // Allow Cross Origin
app.use(express.json()); // Allow Request-body Parser
app.use(router); // Send all requests to the router
// app.use("/api", router); // Send all requests having "/api" end point to the router


app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
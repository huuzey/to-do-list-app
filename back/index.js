const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const todoroute = require("./routes/todoroute");
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/", todoroute);

PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL, console.log("connected"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

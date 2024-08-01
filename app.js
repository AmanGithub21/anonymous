require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

const Message = require("./models/Message");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
mongoose
  .connect(`${dbUrl}`)
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log("DB NOT CONNECTED", e);
  });

app.post("/api/insert/anonymous", async (req, res) => {
  //   console.log("hit", req.body.message);
  if (req.body.message) {
    const result = new Message({ message: req.body.message });
    await result.save();
    return res.status(200).json();
  }
  return res.status(2001).json();
});

app.get("/allmessages", async (req, res) => {
  const result = await Message.find();
  return res.send(result);
});

app.get("/deleteall", async (req, res) => {
  const result = await Message.deleteMany();
  return res.send(result);
});

app.get("/test", (req, res) => {
  return res.send("<h1> Hello </h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

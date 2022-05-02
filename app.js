const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const user = require("./models/user");
const app = express();

mongoose.connect("mongodb://localhost:27017/simple-auth-project");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Root");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({ username, password: hash });
  await user.save();
  res.redirect("/");
});

app.get("/secret", (req, res) => {
  res.send("Secret message");
});

app.listen(3000, () => {
  console.log("Connected on port 3000");
});

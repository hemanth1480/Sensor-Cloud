const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/",(req,res) => {
    res.render("home")
});

app.get("/login", (req,res) => {
    res.render("login");
});

app.get("/register",(req,res) => {
    res.render("register");
});

app.get("/forgot-password", (req,res) => {
    res.render("forgotpassword");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 59;
}

app.listen(port, () => {
  console.log("Server started on port",port)
}); 
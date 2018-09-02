
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs")
// app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) => {
        if (err) {
            console.log("Uneable to append to server.log");
            
        }
    });
    next();
});

app.use((req,res,next) => {
    res.render("maintenance.hbs")
});

hbs.registerHelper("currentYear", () => {
    return new Date().getFullYear();
});
hbs.registerHelper("toUpperCase", (text) => {
    return text.toUpperCase();
})
app.get("/",(req,res) => {
    res.render("home",{
        name:"Moisés Ochoa",
        pageTitle:"Home"
    });
});

app.get("/help",(req,res) => {
    res.render("help",{
        pageTitle:"Helper"
    });
});

app.listen(3000, () => {
    console.log('Server running in port 3000');
});
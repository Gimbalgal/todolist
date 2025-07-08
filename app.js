const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static("public")); 

const items = ["Start a course", "Watch a movie", "Read a book"];
const workItems = [];

app.set('view engine', 'ejs');

app.get('/', function(req, res){

    const day = date.getDate()

    res.render("list", {listTitle: day, newListItems: items });
});

app.post("/", function(req, res){
    const item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    
    res.render("list", {listTitle: "Work", newListItems: workItems});
});

app.post("/work", function(req, res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
    console.log("Server is running on port " + PORT);
});

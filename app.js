const express = require("express")
const app = express()
// const app = require("express")()
app.set("view engine", "ejs")//tells express js to set environmnt for ejs to run


app.get("/", function(req, res){
    res.render("home.ejs")
    
})
app.get("/about", function(req, res){
    res.render("about.ejs")
})
app.listen(3000, function(){
    console.log("Backend has started at port 3000")
})
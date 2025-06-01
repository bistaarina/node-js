// const { name } = require("ejs")
const express = require("express")
require("./database/db")
const app = express()
// const app = require("express")()
app.set("view engine", "ejs")//tells express js to set environmnt for ejs to run


app.get("/contact", function(req, res){
    // let name ="arina"
    res.render("contact",{age:23,name:"arina"})
    
})
app.get("/about", function(req, res){
    res.render("about")
})

app.listen(3000, function(){
    console.log("Backend has started at port 3000")
})
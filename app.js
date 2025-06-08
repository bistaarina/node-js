// const { name } = require("ejs")
const express = require("express")
const db = require("./database/db") // database connection 
const app = express()
// const app = require("express")()
app.set("view engine", "ejs")//tells express js to set environmnt for ejs to run

app.use(express.urlencoded({ extended:true}))
const bcrypt = require("bcrypt");
// app.get("/contact", function(req, res){
//     // let name ="arina"
//     res.render("contact",{age:23,name:"arina"})
    
// })
// app.get("/about", function(req, res){
//     res.render("about")
// })


//projectt
//get todo-page
app.get("/",(req,res)=>{
    res.render("authentication/get_todopage", )//rendering todo-page.ejs

})
// add todo page
app.get("/add-todo",(req,res)=>{
    res.render("authentication/add_todopage", )

})
//update todo page
app.get("/update-todo",(req,res)=>{
    res.render("authentication/update_todo_page")

})
//login-todo page
app.get("/login-todo",(req,res)=>{
res.render("authentication/login_todo_page")
})

//register todo page
app.get("/register",(req,res)=>{
    res.render("authentication/register-todo-page")
    


})
app.get("/todo-list",(req,res)=>{
    res.render("todo-insert")
})

app.post('/todo-list', async (req,res) => { 
    const {task,description,date,status} = req.body;

    await db.Todos.create({
        task: task,
        description: description,
        date: date,
        status: status
    });
})

app.post('/register', async (req, res) => {
    const{ username, email,password,confirm_password } = req.body
    if (password !== confirm_password) {
         res.send('Passwords do not match');
    }

await db.users.create({
         username: username,
          email: email,
         password:bcrypt.hashSync(password, 10) // Hashing the password
          

        
    })
})


app.listen(3000, function(){
    console.log("Backend has started at port 3000")
})
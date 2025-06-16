// const { name } = require("ejs")
const express = require("express")
const db = require("./database/db") // database connection 
const app = express()
// const app = require("express")()
app.set("view engine", "ejs")//tells express js to set environmnt for ejs to run

app.use(express.urlencoded({ extended:true}))
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")
const isloginornot = require("./middleware/isloginornot")

const cookieParser = require("cookie-parser")
app.use(cookieParser()) //middleware to parse cookies


//projectt
//get todo-page
app.get("/",(req,res)=>{
    res.render("authentication/get_todopage", )//rendering todo-page.ejs

})
// add todo page
app.get("/add-todo", isloginornot, (req,res)=>{
   //const datas= await db.Todos.findAll()// selecting all the todos from the database
//    console.log(datas) 
   res.render("authentication/add_todopage",{todos:datas} )


})
//update todo page
app.get("/update-todo",(req,res)=>{
    res.render("authentication/update_todo_page")

})
//login-todo page
app.get("/login",(req,res)=>{
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
    console.log(req.body);
    const{ username,email,password,description,confirm_password } = req.body
    if (password !== confirm_password) {
         res.send('Passwords do not match');
    }

await db.users.create({
         username: username,
          email: email,
          description: description,
         password:bcrypt.hashSync(password, 10) // Hashing the password

    })
    res.send('User registered successfully');
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.users.findAll({ 
        where: {
             email: email } 
            });
    
    if (user.length==0){
        res.send('User not found');
    } 
   else{
    const isPasswordValid = bcrypt.compareSync(password, user[0].password);
    if (isPasswordValid) {
        //token generation
        const token = jwt.sign({name:"arina"},"thisismee",{
            expiresIn: '1d' // Token will expire in 1 days
        })
        res.cookie('token', token)
        res.redirect("/")
       // res.send(token); // Send the token to the client
    } else {
        res.send('Invalid password');
    }
   }
});


app.listen(3000, function(){
    console.log("Backend has started at port 3000")
})
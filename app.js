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


//get todo-page
app.get("/", isloginornot,async(req,res)=>{
    res.render("authentication/get_todopage", ) //rendering todo-page.ejs 

})
// add todo page
app.get("/add-todo", isloginornot, async (req,res,next)=>{
    const userId = req.userId
   const datas= await db.Todos.findAll({
    where : {
        userId : userId
    }
   })// selecting all the todos from the database
//    console.log(datas) 
   res.render("todo/add_todopage",{todos:datas} )


})
//update todo page...
app.get("/update-todo",(req,res)=>{
    res.render("todo/update_todo_page")

})
//login-todo page
app.get("/login",(req,res)=>{
res.render("authentication/login_todo_page")
})

//register todo page
app.get("/register",(req,res)=>{
    res.render("authentication/register-todo-page")
    


})
app.get("/todo_insert",(req,res)=>{
    res.render("todo/todo_insert")
})

app.get("/delete/:id", async (req, res) => {
    const id = req.params.id

    await db.Todos.destroy({
        where: {
            id: id
        }
    })
    res.send("Deleted successfully")
})

app.post('/todo-list', isloginornot, async (req,res) => { 
    const userId = req.userId // Assuming you have userID from the authenticated user
console.log(req.userId)
    const {task,description,date,status} = req.body;

    await db.Todos.create({
        task: task,
        description: description,
        date: date,
        status: status, 
        userId : userId
    });

    res.redirect("/add-todo");
})

app.post('/register', async (req, res) => {
    console.log(req.body);
    const{ username,email,password,description,confirm_password } = req.body
    // if (password !== confirm_password) {
    //      res.send('Passwords do not match');
    // }

await db.users.create({
         username: username,
          email: email,
          description: description,
         password:bcrypt.hashSync(password, 10) // Hashing the password

    })
    res.redirect('/login');
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Check if the user exists in the database
    const user = await db.users.findAll({ 
        where: {
             email: email } 
            });
    
    //select * from users where email = email
    // If user not found, send an error response        
    if (user.length==0){ // email wala user vetena vane
        res.send('not registered email');
    } 
   else{

    //now check password, first --> plain password(form bata aako), hased password already register garda table ma baseko
    const isPasswordMatch = bcrypt.compareSync(password, user[0].password)
    if (isPasswordMatch) {
        //token generation
        const token = jwt.sign({id: user[0].id },"thisismeee",{
            expiresIn: '1d' // Token will expire in 1 days
        })

        res.cookie('token', token)
        res.redirect('/'); // Redirect to the home page after successful login
       // res.send(token); // Send the token to the client
    
    } else {
        res.send('Invalid credentials'); 
    }
   }
});




app.listen(3000, function(){
    console.log("Backend has started at port 3000")
})
//database connection code
const {Sequelize, DataTypes }= require("sequelize")
const makeBlogTable = require("../models/blogmodel");
require("dotenv").config();// yo garepaxi only maile dotenv ko data haru yo file ma access milxa


 


const sequelize = new Sequelize(
    {
    database:process.env.db_name,
    username:process.env.db_username,
    password:process.env.db_password,
    host:process.env.db_host,
    dialect:"mysql",
    port:process.env.db_port,
})
//making object of sequelize to connect with database
sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

    const db={}
 db.blogs =require ("./../models/blogmodel")(sequelize,DataTypes)
 db.users = require ("./../models/usermodel")(sequelize,DataTypes)
 db.Todos = require ("./../models/todomode")(sequelize,DataTypes)

 // establishing relationships
db.users.hasMany(db.Todos)
db.Todos.belongsTo(db.users)





 sequelize.sync({alter:false}).then(() =>{
    console.log("migrated sucessfully")//migration code
 })

module.exports = sequelize

module.exports = db // exporting db object to use in other files

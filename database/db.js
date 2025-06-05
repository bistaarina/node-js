//database connection code
const {Sequelize, DataTypes }= require("sequelize")
const makeBlogTable = require("../models/blogmodel");
require("dotenv").config();


 


const sequelize = new Sequelize({
    database:process.env.db_name,
    username:process.env.db_username,
    password:process.env.db_password,
    host:process.env.db_host,
    dialect:"mysql",
    port:process.env.db_port,
})//making o h
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
 
 sequelize.sync({alter:true}).then(() =>{
    console.log("migrated sucessfully")//migration code
 })

module.exports = sequelize;

module.exports = db; // exporting db object to use in other files

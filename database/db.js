//database connection code
const Sequelize = require("sequelize")
require("dotenv").config();

const sequelize = new Sequelize({
    database:process.env.db_name,
    username:process.env.db_username,
    password:process.env.db_password,
    host:process.env.db_host,
    dialect:"mysql",
    port:process.env.db_port,
})//making o
sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
module.exports = sequelize;
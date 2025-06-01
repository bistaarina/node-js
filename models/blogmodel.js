
//const sequelize = require("sequelize")
const makeBlogTable= (sequelize, DataTypes)=>{
const Blog = sequelize.define("blog",{
   title:{
    type: DataTypes.STRING
   },
   Description:{
    type: DataTypes.STRING
   },
   subtitle: {
    type: DataTypes.STRING
   }

    
})

return Blog
}

module.exports = makeBlogTable
// .define() == table banaune vayo




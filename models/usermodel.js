const makeUserTable = (sequelize, Datatypes)=>{
const User =sequelize.define("users",{
    username: {
        type : Datatypes.STRING
    },
    password: {
        type: Datatypes.STRING
    },
    email:{
        type: Datatypes.STRING
    },
    discription: {
        type: Datatypes.STRING
    },
    columns: {
        type: Datatypes.STRING
    }
    
})
return User
}


module.exports = makeUserTable;
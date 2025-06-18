const jwt = require('jsonwebtoken');


const isloginornot = (req, res,next)=>{
    //receive token
    const token = req.cookies.token
    //verifies token
    if(!token){
        res.send("You are not logged in");

    }else{
        //verify the token
        jwt.verify(token, "thisismeee", (err, decoded)=>{
            if(err){
                res.send("invalid token");
            }else{
               req.userId= decoded.id
                next()  
    }
})
    }

   
  
   
 } 




module.exports = isloginornot;
const jwt = require('jsonwebtoken');


const isloginornot = (req, res)=>{
    //receive token
    const token = req.cookies.token
    //verifies token
    if(!token){
        res.send("You are not logged in");

    }else{
        //verify the token
        jwt.verify(token, "this is my secrethahaa", (err, decoded)=>{
            if(err){
                res.send("invalid token");
            }else{
               res.userID= XPathResult.id
                next()
    }
})
    }

   
  
   
 } 




module.exports = isloginornot;
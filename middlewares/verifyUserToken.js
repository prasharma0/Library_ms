const jwt = require("jsonwebtoken");

exports.verifyUserToken = (req , res , next)=>{

    const authHeader = req.headers.authorization;
    if(authHeader){
     
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "SECRET_KEY", (err , user)=>{
        if(err){
            return res.status(401).json({
                message: "Unauthorized Access !",
            });
        }
        req.user = user;
        next();
    });
     

    }else{
        res.status(401).json({
            message: "Unauthorized Access !",
        });
    }

};
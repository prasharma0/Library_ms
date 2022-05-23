const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {check} = require("express-validator");
const { validateEmailPassword } = require("../middlewares/validateEmailPassword");
const bcryptjs = require("bcryptjs");


//register
router.post("/register" , async (req , res)=>{

    const {email , password , fullName} = req.body;
    const hashedPassword = bcryptjs.hashSync(password , bcryptjs.genSaltSync(15));

    const user = new User ({

        email,
        password: hashedPassword,
        fullName,
    });
    try {
        const savedUser = await user.save();
        res.status(201).json({
            message: "User registered Successfully !",
            user: savedUser,
        });
    } catch (err) {
        console.log(res.json({
            error: err,
        }));
    }
});


//login
router.post("/login" , [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ min:6}).not().isEmpty(),
], validateEmailPassword , async (req , res)=>{

    const {email , password}= req.body;
    try{
        const user = await User.findOne({email});
        const checkPassword = bcryptjs.compareSync(password , user.password);
        if(checkPassword){
            var token = jwt.sign({id:user._id}, "SECRET_KEY", {
                expiresIn: 6*60*60, //in sec
            });
            res.status(200).json({
                message: "User logged In successfully !",
                token,
            });

        }else{
            res.status(400).json({
                message: " username or password did not matched !",
                
            });
        };
    }catch(err){
     res.status(400).json({
         error: err,
     });
    };

}

);

// to fetch number of students in a library
router.get("/", async(req, res)=>{
    try {
        const allUser = await User.find(); 
        res.json({
            data:allUser[0],         // through unique email of students.
        });
    } catch (err) {
        res.status(400).json({
        error:err,
        });
    };
});

module.exports = router;
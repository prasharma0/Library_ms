const {validationResult} = require("express-validator");
exports.validateEmailPassword = async(req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let error ={};
        errors.array().map((err)=> error[err.param] = err.msg);
        return res.json({ error});
    }
    next();
}
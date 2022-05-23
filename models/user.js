const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    
    email:{
        type: String,
        unique: true,
        trim:true,
        lowercase:true,
        required:[true, "Email is Required."],
    },
    password:{
        type:String,
        required:[true, "Password is required."],
    },

    fullName:{         //name is not required as we are giving student a login credential only provided by the admins.
        type: String,
        
    },
});
//now creating a model
const user = new mongoose.model("user", UserSchema);
//in order to user this model we must export it as given below
module.exports = user;
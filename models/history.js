const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({

    book:{
        required : true, 
        type: mongoose.Schema.ObjectId,  
        ref: "book", 
    },
    member: {
        required : true,  
        type: mongoose.Schema.ObjectId,
        ref: "member", 
    },
    type:{
        required: true,    
        type: String,     
        default: "Borrow", 
    }
},
{timestamps: true}
);
module.exports = mongoose.model("History" , historySchema);
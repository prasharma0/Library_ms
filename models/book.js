const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required : true,
    },
    author:{
        type:String,
        required:true,
    },

    category:{  
        required: true,      
        type: mongoose.Schema.ObjectId,
        ref: "Genre",
        
    },
    status:{  
        type:Boolean,
        default: true,
    }, 
}); 
//now creating a model 
const book = new mongoose.model("book", bookSchema);  
//in order to user this model we must export it as given below
module.exports = book;  
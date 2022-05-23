const mongoose = require("mongoose");
const memberSchema = mongoose.Schema({

    fullName:{
        type: String,
        required: true,
    },
    membership: {
        type: String,
        required: true,
    },
},{timestamps :true}
);
module.exports = mongoose.model("Member", memberSchema);
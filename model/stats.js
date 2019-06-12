const mongoose = require("mongoose");

const stats = mongoose.Schema({
    waterLevelPercentage:{
        type: String,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Stats', stats)
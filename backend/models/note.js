const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const noteSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    tags: {type: [String], default: []},
    isPinned:{ type: String, default:false},
    userId:{ type: String, default:true},
    createdOn:{type : Date , default: new Date().getTime()},

})

module.exports = mongoose.model("Note", noteSchema);
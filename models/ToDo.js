const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId
    },
    todo : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("ToDo", ToDoSchema);
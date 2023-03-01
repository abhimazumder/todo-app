const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema({
    todo : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("ToDo", ToDoSchema);
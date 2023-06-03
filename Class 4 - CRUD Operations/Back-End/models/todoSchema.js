const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    todo: String,
    // created_at: {
    //     type: Date,
    //     default: Date.now(),
    // },
},
    {
    timestamps: true
    },
)

const TodoModel = mongoose.model("todo", todoSchema);
module.exports = TodoModel;
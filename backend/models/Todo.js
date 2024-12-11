const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isDone: { type: Boolean, default: false },
});

module.exports = mongoose.model('Todo', TodoSchema);

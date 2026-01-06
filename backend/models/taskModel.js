const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }, 

  completed: {
    type: Boolean,
    default: false,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

});

module.exports = mongoose.model("Task", taskSchema);
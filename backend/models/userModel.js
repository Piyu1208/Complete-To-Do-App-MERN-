const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

//use traditional function with pre(save)
//using an arrow function changes the scope of this
userSchema.pre('save', async function(next) {
  //if password is not modified
  if(!this.isModified('password')) return next();

  //else hash the password
  this.password = await bcrypt.hash(this.password, 12);
});


userSchema.methods.correctPassword = async function (
  candidatePassword, userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
}


module.exports = mongoose.model("User", userSchema);
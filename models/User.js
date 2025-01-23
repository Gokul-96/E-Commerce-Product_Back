const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userModelSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);


// Encrypt psw before saving
userModelSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  // Compare entered password with hashed password
  userModelSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  module.exports = mongoose.model('User', userModelSchema);

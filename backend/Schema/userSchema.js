const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    default: '' 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneno: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },hobbies: {
    type: [String], // Array of strings for hobbies
    default: []
  },
  friendlist: [{
    type: Schema.Types.ObjectId,
    ref: 'User' // Reference to other users
  }]
}, 
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

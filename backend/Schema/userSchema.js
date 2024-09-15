const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name:{
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png' 
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
  }],
  friendRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'User' // Pending friend requests
  }],
  receivedFriendRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'User' // Friend requests received by the user
  }]
}, 
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

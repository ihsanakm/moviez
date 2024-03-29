const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    movies:[{type:mongoose.Schema.Types.ObjectId, ref:"Movie"}]

  });

const User = mongoose.model('User', UserSchema);

module.exports = User;
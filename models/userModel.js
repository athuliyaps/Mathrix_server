const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
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
    },
    score:{
        type:Number,
        default:0
    },
    hasPassed:{
        type:Boolean,
        default:false   //initailly false, as user not passed
        
    }
});

const users = mongoose.model('users', userSchema);
module.exports = users;
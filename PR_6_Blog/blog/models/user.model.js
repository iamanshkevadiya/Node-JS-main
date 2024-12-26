const mongoose = require('mongoose');

const userShcema = new mongoose.Schema({
    useername: String,
    email: String,
    password: String,
    isActive: Boolean,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});


const User = mongoose.model('User', userShcema);

module.exports = User;
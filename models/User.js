const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        min: [6, 'Email must be at least 6 characters'],
        max: [50, 'Email must be at most 50 characters'],
        required: [true, 'Email is required'],
        unique: true,
    },
    password: { type: String, required: true },
    preferences: { type: mongoose.Schema.Types.ObjectId, ref: 'Preferences' }

})

const User = mongoose.model('User', userSchema);

module.exports = User;
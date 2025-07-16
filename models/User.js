const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'Email is required'],
        unique: true,
    },
    password: { type: String, required: true },
    preferences: {
        categories: [String],
        sources: [String]
      }

})

const User = mongoose.model('User', userSchema);

module.exports = User;
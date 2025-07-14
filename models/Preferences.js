const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
    
    category: { type: String, required: true },
    language: { type: String, required: true }
});

const Preferences = mongoose.model('Preference', preferencesSchema);
module.exports = Preferences;
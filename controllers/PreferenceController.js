const Preferences = require('../models/Preferences');
const preferencesModel = require('../models/Preferences');
const User = require('../models/User');

async function savePeferences(req, res) {
    try {
        const { category, language } = req.body;

        const savedPreference = preferencesModel.save(req.body);

        res.status(201).json({ message: 'Preference created successfully', preference: savedPreference });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred when saving the preference.', error });
    }

}

async function preferences(req, res) {
    try {

        const user = await User.findById(req.userDetails.id).select('preferences');
        const preferenceDetails = await preferencesModel.findById(user.preferences._id);
        if (!preferenceDetails) return res.status(200).json({ message: 'No preferences for loggedIn user' });
        res.json(preferenceDetails).status(200);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

async function updatePreferences(req, res) {
    try {
        const userId = req.userDetails.id;
        const newPreferences = req.body.preferences;
        const preferences=await User.findById(userId).select('preferences');
        console.log("id",preferences.preferences._id);
        const updatedPreferences=await preferencesModel.findByIdAndUpdate(preferences.preferences._id,  newPreferences );
       // const user = await User.findByIdAndUpdate(req.userDetails.id, { preferences: newPreferences });
        if (!updatedPreferences) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Preferences updated', preferences: updatedPreferences });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
module.exports = { savePeferences, preferences ,updatePreferences}
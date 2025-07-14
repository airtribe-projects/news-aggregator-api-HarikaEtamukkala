const preferencesModel = require('../models/Preferences');


async function savePeferences(req, res) {
    try {
        const { category, language } = req.body;

        const savedPreferene = preferencesModel.save(req.body);

        res.status(201).json({ message: 'Preference created successfully', preference: savedPreference });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred when saving the preference.', error });
    }

}
module.exports={savePeferences}
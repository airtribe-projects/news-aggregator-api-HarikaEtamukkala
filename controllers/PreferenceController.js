const user = require('../models/user');


async function preferences(req, res) {
    try {

      const userDetails = await user.findById(req.user.userId);
      return res.status(200).json(userDetails.preferences);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

async function updatePreferences(req, res) {
    try {
        const {categories,sources}= req.body;
        await user.findByIdAndUpdate(req.user.userId, { preferences: { categories, sources } });
        res.json({message:'Preferences updated'});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
module.exports={  preferences ,updatePreferences}
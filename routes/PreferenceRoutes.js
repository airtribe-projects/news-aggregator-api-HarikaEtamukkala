const express = require('express');
const preferenceRouter = express.Router();
const { preferences,updatePreferences } = require('../controllers/preferenceController');
const authenticate = require('../middleware/authenticate');

preferenceRouter.get("/preferences",authenticate,preferences);
preferenceRouter.put("/preferences",authenticate,updatePreferences);
module.exports= preferenceRouter;
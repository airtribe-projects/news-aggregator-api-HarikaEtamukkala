 const express = require('express');
const preferenceRouter = express.Router();
const { preferences,updatePreferences } = require('../controllers/preferenceController');
const authenticate = require('../middleware/auth');

preferenceRouter.get("/",authenticate,preferences);
preferenceRouter.put("/",authenticate,updatePreferences);


module.exports= preferenceRouter; 
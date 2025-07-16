const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { preferences, updatePreferences } = require('../controllers/preferenceController');
const authenticate = require('../middleware/authenticate');


router.use(express.json());

router.post("/signup", registerUser);

router.post("/login", loginUser);


module.exports = router;
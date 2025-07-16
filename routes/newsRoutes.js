const express = require('express');
const authenticate = require('../middleware/auth');
const {fetchNews} = require('../controllers/newsController');

const newsRouter = express.Router();

newsRouter.get('/', authenticate, fetchNews);

module.exports = newsRouter;
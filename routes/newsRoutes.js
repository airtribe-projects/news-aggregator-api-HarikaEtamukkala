const express = require('express');
const authenticate = require('../middleware/auth');
const {fetchNews,readArticle} = require('../controllers/newsController');


const newsRouter = express.Router();

newsRouter.get('/', authenticate, fetchNews);
newsRouter.post('/:id/read', authenticate, readArticle);
module.exports = newsRouter;
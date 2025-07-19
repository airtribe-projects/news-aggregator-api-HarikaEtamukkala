require('dotenv').config();
const axios = require('axios');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authenticate = require('../middleware/authenticate');
const NEWS_API_KEY = process.env.NEWS_API_KEY;


async function fetchNews(req, res) {

  const dbuser = await User.findById(req.user.userId);
  const { categories = [], sources = [] } = dbuser.preferences;

  const params = {

    category: categories.join(','),
    sources: sources.join(',')

  };
  const headers = {
    'X-Api-Key': NEWS_API_KEY
  };

  try {

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',   // required
      },
      headers: {
        'X-Api-Key': process.env.NEWS_API_KEY
      }

    });

    res.status(200).json(response.data.articles);

  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Failed to fetch news articles.' });
  }
}

async function readArticle(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    // Find the user in the database
    const dbUser = await User.findById(userId);

    if (!dbUser) {
      return res.status(404).json({ message: 'User not found' });
    }


    if (!dbUser.readArticles.includes(id)) {
      dbUser.readArticles.push(id);
      await User.findByIdAndUpdate(req.user.userId, { readArticle: dbUser.readArticles });
    }

    res.status(200).json({ message: `Article ${id} marked as read` });
  } catch (error) {
    console.error('Error marking article as read:', error.message);
    res.status(500).json({ message: 'Failed to mark article as read' });
  }
}

module.exports = { fetchNews, readArticle };
[
    ![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19911501&assignment_repo_type=AssignmentRepo)

# **News Aggregator API**

A RESTful API for a personalized news aggregator built using Node.js, Express.js, MongoDB, bcrypt, and JWT. This API allows users to register, log in, manage their preferences, fetch news articles, and mark articles as read or favorite.

---

## **Features**
- **User Authentication**:
  - Secure user registration and login using `bcrypt` for password hashing and `jsonwebtoken` for token-based authentication.
- **User Preferences**:
  - Save and retrieve user preferences for news categories and sources.
- **News Management**:
  - Fetch news articles from an external API.
  - Mark articles as read or favorite.
  - Retrieve all read or favorite articles.
- **Caching**:
  - Implemented caching for fetched news articles to reduce external API calls.
- **Error Handling**:
  - Comprehensive error handling for invalid inputs, unauthorized access, and server errors.

---

## **Getting Started**

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- External News API key (e.g., [NewsAPI](https://newsapi.org/))

---

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd news-aggregator-api
 Install dependencies:
 npm install
 Create a .env file in the root directory and add the following environment variables:
 PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
NEWS_API_KEY=<your-news-api-key>
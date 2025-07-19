const tap = require('tap');
const supertest = require('supertest');
const sinon = require('sinon');
const app = require('../app');
const server = supertest(app);
const user = require('../models/User');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');
const axios = require('axios');
const mockUser = {
    name: 'Clark Kent',
    email: 'clark@superman.com',
    password: 'Krypt()n8',
    preferences: ['movies', 'comics']
};

let token = '';

tap.beforeEach(() => {
    sinon.stub(userController, 'registerUser').resolves(mockUser);
    sinon.stub(userController, 'loginUser').resolves({ token: 'mocked-token' });
    sinon.stub(user, 'create').resolves(mockUser); // Mock the create method
    sinon.stub(user, 'findOne').resolves(mockUser); // Mock the findOne method
    sinon.stub(axios, 'get').resolves({ data: { articles: [{ title: 'Mock News' }] } });
    sinon.stub(user, 'findById').resolves(mockUser);
});

tap.afterEach(() => {
    sinon.restore();
});
// Auth tests

tap.test('POST /users/signup', async (t) => {

    const response = await server.post('/users/signup').send(mockUser);

    t.equal(response.status, 200);
    t.end();
});

tap.test('POST /users/signup with missing email', async (t) => {
    const response = await server.post('/users/signup').send({
        name: mockUser.name,
        password: mockUser.password
    });
    t.equal(response.status, 400);
    t.end();
});

tap.test('POST /users/login', async (t) => {
    sinon.stub(bcrypt, 'compareSync').returns(true);
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: mockUser.password
    });
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'token');
    token = response.body.token;
    t.end();
});

tap.test('POST /users/login with wrong password', async (t) => {
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: 'wrongpassword'
    });
    t.equal(response.status, 401);
    t.end();
});

// Preferences tests

tap.test('GET /users/preferences', async (t) => {
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);

    t.equal(response.status, 200);

    t.same(response.body, mockUser.preferences);
    t.end();
});

tap.test('GET /users/preferences without token', async (t) => {
    const response = await server.get('/users/preferences');
    t.equal(response.status, 401);
    t.end();
});

tap.test('PUT /users/preferences', async (t) => {
    const response = await server.put('/users/preferences').set('Authorization', `Bearer ${token}`).send({
        categories: ['movies', 'comics']
    });
    t.equal(response.status, 200);
});

tap.test('Check PUT /users/preferences', async (t) => {
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);

    t.same(response.body, ['movies', 'comics']);
    t.end();
});

// News tests

tap.test('GET /news', { timeout: 10000 }, async (t) => {
    const response = await server.get('/news').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);

    t.end();
});

tap.test('GET /news without token', async (t) => {
    const response = await server.get('/news');
    t.equal(response.status, 401);
    t.end();
});



tap.teardown(() => {
    process.exit(0);
});
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jsonToken = require('jsonwebtoken');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const preferenceRouter = require('./routes/preferenceRoutes');
const newsRouter = require('./routes/newsRoutes');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/users/preferences",preferenceRouter);
app.use('/news', newsRouter);

mongoose.connect(process.env.MONGODB_URI)
.then(()=> {
    console.log("connected to Atlas");
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
})




module.exports = app;
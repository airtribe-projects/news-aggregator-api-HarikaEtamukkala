require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jsonToken = require('jsonwebtoken');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);

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

app.get("/api/v1/news",(req,res)=>{
    return res.send(200);
})

 

/* app.post("/users/login",  (req, res) => {

    try {
        const hashedPassword =  bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        res.status(200).json({ message: 'User registered successfully' });
    } catch {
        res.status(400).json({ error: 'Internal server error' });
    }
}) */

module.exports = app;
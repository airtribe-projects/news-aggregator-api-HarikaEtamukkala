const UserModel = require('../models/User');
const Preference = require('../models/Preferences');
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

async function registerUser(req, res) {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                success: 'false',
                message: 'name is required',
            });
        } else if (!req.body.email) {
            return res.status(400).send({
                success: 'false',
                message: 'email is required',
            });
        }
        else if (!req.body.password) {
            return res.status(400).send({
                success: 'false',
                message: 'password is required',
            });
        } else if (!req.body.preferences) {
            return res.status(400).send({
                success: 'false',
                message: 'preferences is required',
            });
        }
        req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
        const newPreference = new Preference(req.body.preferences);
        const savedPreference = await newPreference.save();
        
            const newUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password ,
                preferences: savedPreference._id // Use the ObjectId here
              });
              
        await UserModel.create(newUser)
            .then((dbUser) => {
                res.status(200).send(dbUser);
            }).catch((err) => {
                console.log("Error creating user", err);
                res.status(500).send({ text: "Error creating user" });
            }); 

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Internal server error' });
    }

}


async function loginUser(req, res) {

    const secret = process.env.SECRET_JWT;
    const { email, password } = req.body;
    console.log("email", email);
    const dbUser = await UserModel.findOne({ email: email });
    console.log("dbuser",dbUser);
    if (!dbUser) {
        return res.status(401).send({ text: "Invalid email" });
    }
    const hashedPassword = bcrypt.hashSync(dbUser.password, saltRounds);

    console.log("hashedPassword", hashedPassword);
    console.log("dbUser.password", dbUser.password);

    const isPasswordValid = bcrypt.compareSync(password, dbUser.password);

    if (!isPasswordValid) {
        return res.status(401).send({ text: "Invalid password" });
    }
    const resUser = {
        id:dbUser._id,
        name: dbUser.name,
        email: dbUser.email

    };

    const token = jwt.sign(resUser, JWT_SECRET, { expiresIn: '1h' });
    res.send({token:token}).status(200);
}
module.exports = { registerUser, loginUser };
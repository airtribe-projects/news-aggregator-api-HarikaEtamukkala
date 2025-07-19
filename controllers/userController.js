const user = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const hashedPassword =
            await bcrypt.hash(password, 10);


        const newUser = new user({
            name: name,
            email: email,
            password: hashedPassword

        });

        await user.create(newUser)
            .then((dbUser) => {
                res.status(200).json(dbUser);
            }).catch((err) => {
                console.log("Error creating user", err);
                res.status(400).send({ text: "Error creating user" });
            });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Internal server error' });
    }

}


async function loginUser(req, res) {


    const { email, password } = req.body;

    const dbUser = await user.findOne({ email: email });

    if (!dbUser) {
        return res.status(401).send({ text: "Invalid email" });
    }
    console.log("DB User:", dbUser);
    console.log("Password:", password);
    console.log("DB User Password:", dbUser.password);
    const isPasswordValid = bcrypt.compareSync(password, dbUser.password);
    console.log("Is password valid:", isPasswordValid);
    if (!isPasswordValid) {
        return res.status(401).send({ text: "Invalid password" });
    }


    const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token: token }).status(200);
}
module.exports = { registerUser, loginUser };
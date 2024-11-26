const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user.model');

const Login = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ msg: "Invalid Pasword" });
    }
    let data = {
        email: user.email,
        password: user.password,
    }
    let token = await jwt.sign(data, 'private-key');
    return res.status(200).json({ msg: 'User logged in', token: token });
};

const Signup = async (req, res) => {

    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        else {
            user = await User.create(req.body);
            let data = {
                email: user.email,
                password: user.password,
            }
            let token = await jwt.sign(data, 'private-key');
            return res.status(201).json({ msg: 'user Created', token: token });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: "err", error: error.message });

    }
};

const getUser = async (req, res) => {
    let users = await User.find();
    res.status(200).json(users);
};

const deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "user Deleted", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "err", error: error.message });
    }
};

let verifyUser = async (req, res) => {
    let { token } = req.params;
    let decode = await jwt.verify(token, 'private-key');
    if (!decode) {
        return res.status(403).json({ msg: "err" });
    }
};

module.exports = {
    Login,
    Signup,
    getUser,
    deleteUser,
    verifyUser,

};
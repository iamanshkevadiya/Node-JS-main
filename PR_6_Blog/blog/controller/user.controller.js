const User = require("../models/user.model");

const signup = async (req, res) => {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.send("user not existing");
    }
    const user = new User({ username, email, password, role });
    await user.save();
    return res.send(` Account created successfully  ${user}`);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) return res.send('Invalid Credentials.');
        res.cookie('role', user.role);
        res.cookie('id', user._id);
        return res.send("Welcome User")
    } catch (err) {
        return res.send('Error logging in');
    }
};

module.exports = { signup, login };
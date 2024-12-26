const { Router } = require("express");
const { signup, login } = require("../controller/user.controller");

const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.get('[/signup', (req, res) => {
    res.render('signup');
})
userRouter.post('/login', login);
userRouter.get('[/login', (req, res) => {
    res.render('login');
})

module.exports = userRouter;
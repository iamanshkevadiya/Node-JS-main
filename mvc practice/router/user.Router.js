const { Router } = require('express');
const { Signup, Login, getUser, deleteUser } = require('../controller/user.controller');
const userRouter = Router();

userRouter.get('/', getUser);
userRouter.post('/signup', Signup);
userRouter.post('/login', Login);
userRouter.delete('/delete', deleteUser)

module.exports = userRouter;
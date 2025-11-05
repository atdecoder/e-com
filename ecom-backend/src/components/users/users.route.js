const userRouter = require('express').Router();
const {
  login,
  findById,
  addData,
  findAll,
  logout
} = require('./users.controller');

const {
  authenticate,
  verifyJwt,
} = require('../../middlewares/auth');

userRouter.post('/login', login);
userRouter.post('/logout', verifyJwt, logout);
userRouter.get('/id/:id',verifyJwt, findById);
userRouter.get('/',verifyJwt, findAll);
userRouter.post('/', addData);
userRouter.get('/auth-check',verifyJwt , (req, res) => {return res.status(200).json({status: true, statusCode: 200});});

module.exports = userRouter;
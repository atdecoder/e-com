const productRouter = require('express').Router();
const {
  addData,
  findAll,
} = require('./product.controller');

const {
  verifyJwt,
} = require('../../middlewares/auth');

productRouter.get('/', findAll);
productRouter.post('/', verifyJwt, addData);

module.exports = productRouter;
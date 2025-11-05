const router = require('express').Router();

const userRouter = require('../components/users/users.route');
const productRouter = require('../components/products/product.route');

router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;
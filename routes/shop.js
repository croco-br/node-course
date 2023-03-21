const express = require('express')
const router = express.Router();
const shopController = require('../controllers/shop')


router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);
router.get('/products/:productId', shopController.getProductById);
router.get('/products', shopController.getProducts);
router.get('/', shopController.getIndex);

module.exports = router;
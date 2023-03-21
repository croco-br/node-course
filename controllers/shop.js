const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (p) => {
        Cart.addProduct(prodId, p.price)
    })
    res.redirect('/cart')
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })

}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            pageTitle: 'Shop',
            path: '/',
            prods: products
        });
    })

}

exports.getProductById = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (product) {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: 'Product Details',
                path: '/products'
            })
        }

    })

}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Cart',
        path: '/checkout'
    });
}


exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your orders',
        path: '/orders'
    });
}



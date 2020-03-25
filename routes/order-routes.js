const express = require('express');
const router = express.Router();
const Order = require('../models/order-model');
const User =

router.post('/order', (req, res, next) => {
    const { products, totalPrice } = req.body
    Order.create({
        products,
        totalPrice,
        client: req.user._id, 
         timestamps: true 

  })
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        res.json(err);
    })
});

module.exports = router;
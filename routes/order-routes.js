const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Order = require('../models/order-model');

router.get('/my-orders/:id', (req, res, next) => {
  const clientId = req.params.id;
  Order.find({ client: clientId})
    .then(myOrders => {
      res.json(myOrders);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/orders', (req, res, next) => {
    Order.find()
      .then(allOrders => {
        res.json(allOrders);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.get('/orders/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Order.findById(req.params.id)
      .then(order => {
        res.status(200).json(order);
      })
      .catch(error => {
        res.json(error);
      });
  });

router.post('/order', (req, res, next) => {
    const { products, totalPrice, typeOfDelivery, priceWithDelivery } = req.body
    Order.create({
        products,
        totalPrice,
        typeOfDelivery,
        priceWithDelivery,
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
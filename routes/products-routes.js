const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product-model');

router.get('/products', (req, res, next) => {
  Product.find()
    .then(allTheProducts => {
      res.json(allTheProducts);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/products', (req, res, next) => {
  const { name, price, brand, category, type, stock, description, imageUrl, size } = req.body;
  Product.create({
    name,
    price,
    brand,
    category,
    type,
    stock,
    description,
    size,
    imageUrl
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});


router.get('/products/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findById(req.params.id)
    .then(product => {
      res.status(200).json(product);
    })
    .catch(error => {
      res.json(error);
    });
});

router.put('/products/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is updated successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

router.delete('/products/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});


module.exports = router;
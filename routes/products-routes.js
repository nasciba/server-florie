const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product-model');

// GET route => all products
router.get('/products', (req, res, next) => {
  Product.find()
    .then(allTheProducts => {
      console.log(allTheProducts);
      res.json(allTheProducts);
    })
    .catch(err => {
      res.json(err);
    });
});

// POST route => to create a new product
router.post('/products', (req, res, next) => {
  console.log(req.body);
  const { name, image, price, brand, category, type, stock, description, size } = req.body;
  Product.create({
    name,
    image,
    price,
    brand,
    category,
    type,
    stock,
    description,
    size
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET route => to get a specific product/detailed view
router.get('/products/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // Our product have array of tasks' ids and
  // we can use .populate() method to get the whole task objects
  Product.findById(req.params.id)
    .then(product => {
      res.status(200).json(product);
    })
    .catch(error => {
      res.json(error);
    });
});

// PUT route => to update a specific product
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

// DELETE route => to delete a specific product
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
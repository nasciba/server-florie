const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    imageUrl: String,
    name: String,
    price: Number,
    brand: String,
    category: String,
    type: String,
    stock: Number,
    description: String,
    size: Number,
})

const Product = mongoose.model('Product', productSchema);
 
module.exports = Product
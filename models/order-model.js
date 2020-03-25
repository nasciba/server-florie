const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: Array,
    totalPrice: Number,
    created: {
        type: Date,
        default: Date.now
      },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order





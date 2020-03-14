const mongoose = mongoose.require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: Array,
    totalPrice: Number,
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity: Number
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
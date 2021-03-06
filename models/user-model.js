const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  cpf: Number,
  phoneNumber: Number,
  admin: { type: Boolean, default: false },
  address: { street: String, number: Number, complement: String, district: String, city: String, state: String, zipcode: Number},
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],

});

const User = mongoose.model('User', userSchema);

module.exports = User;
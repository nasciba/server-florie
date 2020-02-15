const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  fullName: String,
  cpf: Number,
  phoneNumber: Number,
  admin: Boolean,
  address: { street: String, number: Number, complement: String, city: String, state: String, zipcode: Number},
  // order: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Order'
  // },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
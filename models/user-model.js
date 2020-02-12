const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  surname: String,
  cpf: Number,
  phoneNumber: Number,
  address: [{ street: String, number: Number, city: String, state: String, zipcode: Number}],
  // order: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Order'
  // },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
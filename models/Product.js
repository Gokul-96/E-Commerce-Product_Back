const mongoose = require('mongoose');

const productModelSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);



module.exports = mongoose.model('Product', productModelSchema);

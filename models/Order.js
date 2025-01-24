const mongoose = require('mongoose');

const orderModelSchema = mongoose.Schema(

  {
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },

   orderItems: [
      {
        product: {type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true },
        quantity: {type:Number,  required: true },
      },
    ],

    priceTotally: {type:Number, required: true },
    status: {type:String, default: 'Pending' },
  },{ timestamps: true }
);
module.exports = mongoose.model('Order', orderModelSchema);

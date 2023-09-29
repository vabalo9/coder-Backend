import mongoose from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
  id: Number,
  products: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: Number,
    }
  ]
});

cartSchema.pre('find', function() {
  this.populate('products._id')
});

cartSchema.pre('findOne', function() {
  this.populate('products._id')
});

const cartsModel = mongoose.model(cartCollection, cartSchema);

export default cartsModel;

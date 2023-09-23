import mongoose from "mongoose";

const userCollection = 'carts'

const userSchema = new mongoose.Schema({
  id: Number,
  products: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: Number,
    }
  ]
});

userSchema.pre('find', function() {
  this.populate('products._id')
});

userSchema.pre('findOne', function() {
  this.populate('products._id')
});

const cartsModel = mongoose.model(userCollection, userSchema);

export default cartsModel;

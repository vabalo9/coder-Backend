import mongoose from "mongoose";

// 1. Crear el esquema por separado
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    rol: { type: String, default: 'user' }
});

userSchema.pre('find', function() {
    this.populate('cartId');
});

userSchema.pre('findOne', function() {
    this.populate('cartId');
});

// 3. Crear el modelo a partir del esquema
const userModel = mongoose.model('users', userSchema);

export default userModel;

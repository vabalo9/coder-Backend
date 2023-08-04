import mongoose from "mongoose";

const userCollection= 'carts'

const userSchema = new mongoose.Schema({
    id:Number,
    products:{
        type:[
            {
                quantity:Number,
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ]
    }
    
})

userSchema.pre('find', function(){
    this.populate('products.product')
})

const cartsModel= mongoose.model(userCollection, userSchema)


export default cartsModel



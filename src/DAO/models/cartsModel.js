import mongoose from "mongoose";

const userCollection= 'carts'

const userSchema = new mongoose.Schema({
    id:Number,
    products:{
        type:[
            {
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


// import mongoose from "mongoose";

// const cartCollection= 'carts'

// const userSchema = new mongoose.Schema({
//     products:Array,
    
// })



// const cartsModel= mongoose.model(cartCollection, userSchema)

// export default cartsModel
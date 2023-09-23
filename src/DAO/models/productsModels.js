import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection= 'products'

const userSchema = new mongoose.Schema({
    title:{type:String, require:true},
    description:{type:String, require:true},
    price:{type:Number, require:true},
    thumbail:{type:String, require:true},
    code:{type:String, require:true},
    stock:{type:Number, require:true},
    status:Boolean
})

mongoose.set( 'strictQuery', false)

userSchema.plugin(mongoosePaginate)

const userProducts= mongoose.model(userCollection, userSchema)

export default userProducts

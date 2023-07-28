import mongoose from "mongoose";

const userCollection= 'carts'

const userSchema = new mongoose.Schema({
    id:Number,
    products:Array,
    
})



const cartsModel= mongoose.model(userCollection, userSchema)

export default cartsModel
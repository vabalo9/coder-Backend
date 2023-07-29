import mongoose from "mongoose";

const userCollection= 'messages'


const userSchema = new mongoose.Schema({
    messages:Array,
    
})

const messageModel= mongoose.model(userCollection, userSchema)

export default messageModel
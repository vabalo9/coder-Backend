import ticketsModel from "./ticketsModel.js";


export default class Ticket {

    constructor() {

    }

     get = async () => {
        const tickets = await ticketsModel.find().lean().exec()
        return tickets
    }

    getId = async (_id) => {
        const tickets =await cartsModel.findOne({ _id }).lean()
        return tickets
     }


     create = async cart => {
        const cartGenerated = new cartsModel(cart)
        await cartGenerated.save()
        return cartGenerated
    }

     
     
    

    

     
} 

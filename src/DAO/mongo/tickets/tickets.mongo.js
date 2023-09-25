import ticketsModel from "./ticketsModel.js";


export default class Ticket {

    constructor() {

    }

     get = async () => {
        const tickets = await ticketsModel.find().lean().exec()
        return tickets
    }

    getId = async (_id) => {
        const ticket =await ticketsModel.findOne({ _id }).lean()
        return ticket
     }


     create = async ticket => {
        const ticketGenerated = new ticketsModel(ticket)
        await ticketGenerated.save()
        return ticketGenerated
    }

    async addTicket(ticket) {
        try {
            const newTicket = await ticketsModel.create({ amount: ticket.quantity, purchaser:ticket.purchaser})
            return ({ estado: "elemento añadido", newTicket })
        } catch (err) {
            console.error(err)
            return ({ status: 'something is broken', error: err });
        }
    }

     
     
    

    

     
} 

export default class TicketsRepository {
    constructor(dao){
        this.dao=dao
    }

    getTickets = async() =>{
        const result = await this.dao.get()
        return result
    }
    
    
    getTicket = async(id)=>{
        const result = await this.dao.getId(id)
        return result
    }
    
    createTicket = async(ticket)=>{
        const result = this.dao.addTicket(ticket)

        return result
    }

    
    
}
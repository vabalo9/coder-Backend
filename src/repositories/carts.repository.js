export default class CartsRepository {
    constructor(dao){
        this.dao=dao
    }

    getCarts = async() =>{
        const result = await this.dao.get()
        return result
    }

    
    getCart = async(id)=>{
        const result = await this.dao.getId(id)
        return result
    }

    createCart = async(cart)=>{
        const result = await this.dao.create(cart)
    }
    
    agregate = async(cartId, objectId)=>{
        const result = this.dao.agregateProduct(cartId, objectId)
        return result
    }

    deleteProduct = async(cartId, objectId)=>{
        const result = await this.dao.deleteProduct(cartId, objectId)
        return result
    }

    deleteCart = async(cart)=>{
        const result = await this.dao.deleteCart(cart)
        return result
    }
    
}
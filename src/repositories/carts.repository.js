export default class CartsRepository {
    constructor(dao) {
        this.dao = dao
    }

    getCarts = async () => {
        const result = await this.dao.get()
        return result
    }


    getCart = async (id) => {
        const result = await this.dao.getId(id)
        return result
    }

    createCart = async () => {
        const carts = await this.getCarts()
        let ID
        carts.length === 0 ? ID = 1 : ID = carts[carts.length - 1].id + 1;
        const cart = { id: ID, products: [] }
        const result = await this.dao.create(cart)
        return result
    }

    agregate = async (cartId, objectId) => {
        const result = this.dao.agregateProduct(cartId, objectId)
        return result
    }

    deleteProduct = async (cartId, objectId) => {
        const result = await this.dao.deleteProduct(cartId, objectId)
        return result
    }

    deleteCart = async (cart) => {
        const result = await this.dao.deleteCart(cart)
        return result
    }

}
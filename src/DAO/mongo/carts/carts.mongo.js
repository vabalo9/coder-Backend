import cartsModel from "./cartsModel.js";


export default class Carts {

    constructor() {

    }

     get = async () => {
        const carts = await cartsModel.find().lean().exec()
        return carts
    }

     create = async cart => {
        const cartGenerated = await new cartsModel(cart).save()
        return cartGenerated
    }

     getId = async (_id) => {
        const cart =await cartsModel.findOne({ _id }).lean()
        return cart
     }

     agregateProduct = async (cartId, objectId) => {
        const busquedaCarrito = await cartsModel.findOne({ _id: cartId }).lean();
        
        // Usar busquedaCarrito.products para encontrar el índice del producto
        const busquedaProducto = busquedaCarrito.products.findIndex((el) => el._id._id == objectId);
        
        if (busquedaProducto === -1) {
            busquedaCarrito.products.push({ _id: objectId, quantity: 1 });
            await cartsModel.updateOne({ _id: cartId }, { $set: { products: busquedaCarrito.products } });
        } else {
            busquedaCarrito.products[busquedaProducto] = {
                id: objectId,
                quantity: busquedaCarrito.products[busquedaProducto].quantity + 1
            };
            await cartsModel.updateOne({ _id: cartId }, { $set: { products: busquedaCarrito.products } });
        }
        return (await cartsModel.findOne({ _id: cartId }))
    }
    
    

    

     deleteProduct = async (cartId, objectId) => {
        const busquedaCarrito = await cartsModel.findOne({ _id: cartId })
        const busquedaProducto = busquedaCarrito.products.findIndex((el) => el._id._id == objectId);


        if (busquedaProducto != -1) {
            await cartsModel.updateOne(
                { _id: cartId },
                { $pull: { products: { _id: objectId } } }
            );
            return (await cartsModel.findOne({ _id: cartId }))
        } else return ({ 'error': 'no se encontro el producto a eliminar' })
    }

     deleteCart = async (cart) => {
        try {
            await cartsModel.deleteOne({ id: cart })

            return ('carrito eliminado con exito')

        } catch (err) {
            return (err);
        }
    }
} 

export default class Carts {
    constructor() {
        this.db = []
    }

    get = async () => {
        return this.db
    }

    create = async cart => {
        const carts = await this.get()
        carts.push(cart)
        this.db=carts
        return carts
    }

    getId = async id => {
        const carts = await this.get()
        const cart = carts.find((e)=>e.id=id)
        return cart
    }

    agregateProduct = async (cartId, objectId) => {
        const carts = await this.get()
        const busquedaCarrito = await carts.find((el)=>el.id==cartId)
        const busquedaProducto = busquedaCarrito.products.findIndex((el) => el.id == id);
        console.log(busquedaProducto)
        if (busquedaProducto == -1) {
            busquedaCarrito.products.push({ id: objectId, quantity: 1 })
        } else {
            busquedaCarrito.products[busquedaProducto] = {
                id: id,
                quantity: busquedaCarrito.products[busquedaProducto].quantity + 1
            };
        }
        this.db=carts
        return (await carts.find((el)=>el.id==cartId))
    }

    deleteProduct = async (cartId, objectId) => {
        // 1. Uso de await con this.get()
        const carts = await this.get();
        
        const busquedaCarrito = carts.find((el) => el.id == cartId);
    
        // Manejo del caso en que el carrito no se encuentra
        if (!busquedaCarrito) {
            return { error: 'Carrito no encontrado' };
        }
    
        const posicionCarrito = carts.findIndex((el) => el.id == cartId);
        const busquedaProducto = busquedaCarrito.products.findIndex((el) => el.id === objectId);
    
        if (busquedaProducto != -1) {
            // 2. Comparación correcta en filter
            carts[posicionCarrito].products = carts[posicionCarrito].products.filter(e => e.id !== objectId);
            this.db=carts
    
            // 3. Devolución del carrito después de la actualización
            return carts.find((el) => el.id == cartId);
        } else {
            return { error: 'no se encontró el producto a eliminar' };
        }
    }
    
    deleteCart = async (cart) => {
        try {
            let carts = await this.get();
            const busquedaCarrito = carts.find((el) => el.id === cart);
    
            // Manejo del caso en que el carrito no se encuentra
            if (!busquedaCarrito) return { error: 'Carrito no encontrado' };
            
            carts = carts.filter((e) => e.id !== cart);  // Uso de !== en lugar de !=
            this.db=carts
            return 'Carrito eliminado con éxito';
    
        } catch (err) {
            return { error: err.message };  // Devuelve el mensaje de error en un objeto para mantener la consistencia
        }
    }
}
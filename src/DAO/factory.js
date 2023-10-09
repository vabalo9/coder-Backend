import { persistence } from '../config/config.js'
import {logger} from './../utils.js'


export let Carts
export let Products
export let Tickets

switch (persistence) {
    case 'MEMORY':
        logger.info('persistence with memory')
        const { default: CartMemory } = await import('./memory/cart/cart.memory.js')
        Carts = CartMemory
        const { default: ProductsMemory } = await import('./memory/products/products.memory.js')
        Products = ProductsMemory
        break;
    case 'FILE':
        logger.info('persistence with file')
        const { default: CartsFile } = await import('./file/carts/carts.file.js')
        Carts = CartsFile
        const { default: ProductsFile } = await import('./file/products/products.file.js')
        Products = ProductsFile
        break;
    case 'MONGO':
        logger.info('persistence with mongo')
        const { default: CartsMongo } = await import('./mongo/carts/carts.mongo.js')
        Carts = CartsMongo;
        const { default: ProductsMongo } = await import('./mongo/products/products.mongo.js')
        Products = ProductsMongo;
        const { default: TicketsMongo } = await import('./mongo/tickets/tickets.mongo.js')
        Tickets = TicketsMongo;
        break;
    default:
        throw new Error('not persistence is configured')
        break;
}
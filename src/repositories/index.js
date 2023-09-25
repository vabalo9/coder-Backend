import { Products, Carts, Tickets } from "../DAO/factory.js";
import ProductsRepository from "./products.repository.js";
import CartsRepository from "./carts.repository.js";
import TicketsRepository from "./tickets.repository.js";

export const productsService = new ProductsRepository(new Products())
export const cartsService = new CartsRepository(new Carts())
export const ticketsService = new TicketsRepository(new Tickets())

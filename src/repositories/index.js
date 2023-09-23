import { Products, Carts } from "../DAO/factory.js";
import ProductsRepository from "./products.repository.js";
import CartsRepository from "./carts.repository.js";

export const productsService = new ProductsRepository(new Products())
export const cartsService = new CartsRepository(new Carts())
import ProductDTO from "../DAO/DTO/products.dto.js";


export default class ProductsRepository {
    constructor(dao){
        this.dao=dao
    }

    getProducts = async() =>{
        const result = await this.dao.get()
        return result
    }

    
    getProduct = async(id)=>{
        const result = await this.dao.getProductById(id)
        return result
    }
    
    create = async(product)=>{
        const productToInsert = new ProductDTO(product)
        const result = this.dao.addProduct(productToInsert)

        return result
    }

    updapte = async(productoAEditar, NuevoPrecio, NuevoStock)=>{
        const result = await this.dao.updapteProduct(productoAEditar, NuevoPrecio, NuevoStock)
        return result
    }

    delete = async(producto)=>{
        const result = await this.dao.deleteProduct(producto)
        return result
    }
    
}
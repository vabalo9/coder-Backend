import {logger} from "./../../../utils.js"

class Products {
  constructor() {
    this.db = []
  }

  async get() {
    return this.db
  }

 

  async getProductById(IdBuscado) {
    const products = await this.get();
    const productoBuscado = products.find((el) => el.id == IdBuscado);
    if (productoBuscado != undefined) {
      return productoBuscado;
    } else {
      return {error: "El producto no existe"};
    }
  }

  async addProduct(newProduct) {
    const products = await this.get();
    const product = { title:newProduct.title, id:newProduct.id, description:newProduct.description, price:newProduct.price, thumbnail:newProduct.thumbnail, code:newProduct.code, stock:newProduct.stock, status:newProduct.status };
    let codeDetector = products.find((el) => el.code === product.code);
    let propiedadVacia = true;

    for (let propiedad in product) {
      if (product.hasOwnProperty(propiedad)) {
        if (product[propiedad] === null || product[propiedad] === undefined || product[propiedad] === '') {
          logger.info(`El producto ${product.title} no tiene todos los campos completos. Por favor, ingresa todos los campos correctamente para añadirlo a la lista.`);
          return (propiedadVacia = false);
        }
      }
    }

    if (codeDetector != undefined) {
      logger.error('¡Error! El código ya se encuentra presente en otro producto.');
    }

    if (codeDetector === undefined || propiedadVacia === false) {
      this.db.push(product);
       return {updapteProduct:'succes', product}
    }
  }

  async updapteProduct(productoAEditar, NuevoPrecio, NuevoStock) {
     let productos = await this.get();
    let prueba=  productos.findIndex(el=>el.id==productoAEditar)
    if (prueba==-1) {
      return `No se encontro ningún producto con el id ${productoAEditar}`
    } else {
    productos[prueba]={
      title: productos[prueba].title, id: productos[prueba].id, descipcion: productos[prueba].description, price:NuevoPrecio, thumbnail:productos[prueba].thumbnail, code:productos[prueba].code , stock:NuevoStock}
      this.db=productos
      return productos[prueba]
    }
  }

  async deleteProduct(procuctoAEliminar){
    let productos = await this.get();
    let evaluacion = productos.length
    let prueba=  productos.filter(el=>el.id != Number(procuctoAEliminar) )
    this.db=prueba
    if (prueba.length < evaluacion) {
      return "Producto eliminado correctamente"
    }else{
      return "Por algun motivo no se pudo eliminar el producto solicitado"
    }
  }
}


export default Products


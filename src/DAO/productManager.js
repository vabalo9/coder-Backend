import fs from "fs"

class ProductManager {
  constructor(path) {
    this.path = path;
    this.format = 'utf-8';
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, this.format);
      const dataObj = JSON.parse(data);
      return dataObj;
    } catch (error) {
      console.log('No se encontraron productos');
      return [];
    }
  }

 

  async getProductById(IdBuscado) {
    const products = await this.getProducts();
    const productoBuscado = products.find((el) => el.id === IdBuscado);
    if (productoBuscado !== undefined) {
      return productoBuscado;
    } else {
      return {error: "El producto no existe"};
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const list = await this.getProducts();
    let ID;
    list.length === 0 ? ID = 1 : ID = list[list.length-1].id + 1;

    const product = { title, id: ID, description, price, thumbnail, code, stock, status:true };
    let codeDetector = list.find((el) => el.code === code);
    let propiedadVacia = true;

    for (let propiedad in product) {
      if (product.hasOwnProperty(propiedad)) {
        if (product[propiedad] === null || product[propiedad] === undefined || product[propiedad] === '') {
          console.log(`El producto ${product.title} no tiene todos los campos completos. Por favor, ingresa todos los campos correctamente para añadirlo a la lista.`);
          return (propiedadVacia = false);
        }
      }
    }

    if (codeDetector !== undefined) {
      console.log('¡Error! El código ya se encuentra presente en otro producto.');
    }

    if (codeDetector === undefined || propiedadVacia === false) {
      list.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(list));
    }
  }

  async updapteProduct(productoAEditar, NuevoPrecio, NuevoStock) {
     let productos = await this.getProducts();
    let prueba= await productos.findIndex(el=>el.id==productoAEditar)
    if (prueba==-1) {
      return `No se encontro ningún producto con el id ${productoAEditar}`
    } else {
    productos[prueba]={
      title: productos[prueba].title, id: productos[prueba].id, descipcion: productos[prueba].description, price:NuevoPrecio, thumbnail:productos[prueba].thumbnail, code:productos[prueba].code , stock:NuevoStock}
      await fs.promises.writeFile(this.path, JSON.stringify(productos));
      return productos[prueba]
    }
  }

  async deleteProduct(procuctoAEliminar){
    let productos = await this.getProducts();
    let evaluacion = productos.length
    let prueba= await productos.filter(el=>el.id != procuctoAEliminar )
    await fs.promises.writeFile(this.path, JSON.stringify(prueba));
    if (prueba.length < evaluacion) {
      return "Producto eliminado correctamente"
    }else{
      return "Por algun motivo no se pudo eliminar el producto solicitado"
    }
  }
}


export default ProductManager


import fs from "fs"

class ProductManager {
  constructor(path) {
    this.path = path;
    this.format = 'utf-8';
  }

  async getCars() {
    try {
      const data = await fs.promises.readFile(this.path, this.format);
      const dataObj = JSON.parse(data);
      return dataObj;
    } catch (error) {
      console.log('No se encontraron productos');
      return [];
    }
  }

  async getProducts(id) {
    try {
      const data = await fs.promises.readFile(this.path, this.format);
      const dataObj = JSON.parse(data);
      let findProducts = await dataObj.filter((e)=>e.id===id)
      let productosFinales = await findProducts.map((e)=> e.products)
      return await productosFinales 
    } catch (error) {
      console.log('No se encontraron productos');
      return [];
    }
  }



  async addCart(carrito, producto) {
    const list = await this.getCars();
    const busquedaCarrito = list.find((el) => el.id === carrito);
    const busquedaProducto = busquedaCarrito.products.findIndex((el) => el.id === producto);
  
    if (busquedaProducto === -1) {
      const añadido = { id: producto, quantity: 1 };
      busquedaCarrito.products.push(añadido);
    } else {
      busquedaCarrito.products[busquedaProducto] = {
        id: producto,
        quantity: busquedaCarrito.products[busquedaProducto].quantity + 1
      };
    }
  
    await fs.promises.writeFile(this.path, JSON.stringify(list));
    return busquedaCarrito.products[busquedaProducto];
  }
  

  async newCart() {
    const list = await this.getCars();
    let ID;
    list.length === 0 ? ID = 1 : ID = list[list.length-1].id + 1;
    const cart={id:ID, products:[]}
      list.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(list));
      return {status:"succes"}
  }


 }

 


export default ProductManager


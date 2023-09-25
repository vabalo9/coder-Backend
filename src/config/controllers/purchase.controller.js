import { cartsService, ticketsService, productsService } from "../../repositories/index.js"


export const PurchaseCompleted = async (req, res) => {

    let id = req.params.cid
    const products = await productsService.getProducts()
    const cart = await cartsService.getCart(id)

    const primaryOrder=[]
    const finallyOrder=[]
    for (let index = 0; index < cart.products.length; index++) {
      const product =products.find((e)=>e._id.toString()==cart.products[index]._id._id.toString())
      primaryOrder.push(product) 
    }
    for (let index = 0; index < primaryOrder.length; index++) {
      if (primaryOrder[index].stock - cart.products[index].quantity  >=  0) {
        const product = {
          id: cart.products[index]._id._id,
          quantity: cart.products[index].quantity,
          totalProduct: cart.products[index].quantity * primaryOrder[index].price
        };
        finallyOrder.push(product)
      } //else{ console.log('no hay stock')}
    }
    const quantityOrder = finallyOrder.reduce((acc, current) => acc + current.totalProduct, 0);
    const result = await ticketsService.createTicket({quantity:quantityOrder, purchaser:'valentinabalo9@gmail.com'})
    console.log(result)
    res.send(result)  
  } 



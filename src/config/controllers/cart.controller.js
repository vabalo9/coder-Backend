import { cartsService } from "../../repositories/index.js"

export const getCarts = async (req, res) => {
  const carts = await cartsService.getCarts()
  res.send(carts)

}


//esto hay que corregirlo
export const createCart = async (req, res) => {
  const carts = await cartsService.getCarts()

  let ID
  carts.length === 0 ? ID = 1 : ID = carts[carts.length - 1].id + 1;
  const cart = { id: ID, products: [] }

  const cartGenerated = await cartsService.createCart(cart)
  res.send(cartGenerated);
}


export const getCartId = async (req, res) => {
  let id = req.params.cid
  const cart = await cartsService.getCart(id)
  res.send(cart)

}

export const agregateProduct = async (req, res) => {
  let cartId = req.params.cid
  let objectId = req.params.pid
  const updateCart = await cartsService.agregate(cartId, objectId)
  res.send(updateCart)
}



export const deleteProduct = async (req, res) => {
  let cartId = req.params.cid
  let objectId = req.params.pid

  const deleteProduct = await cartsService.deleteProduct(cartId, objectId)
  res.send(deleteProduct)
}


export const deleteCart = async (req, res) => {
  let cart = Number(req.params.cid)

  const deleteCart = await cartsService.deleteCart(cart)

  res.send(deleteCart)
 
}



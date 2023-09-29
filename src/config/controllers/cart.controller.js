import { cartsService } from "../../repositories/index.js"

export const getCarts = async (req, res) => {
  const carts = await cartsService.getCarts()
  res.send(carts)

}


export const createCart = async (req, res) => {
  const cartGenerated = await cartsService.createCart()
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
  

  const deleteProduct = await cartsService.deleteProduct(cartId, 5)
  res.send(deleteProduct)
}


export const deleteCart = async (req, res) => {
  let cart = Number(req.params.cid)

  const deleteCart = await cartsService.deleteCart(cart)

  res.send(deleteCart)
 
}



import { Router } from "express";
import userModel from "../../DAO/models/user.model.js";
import {getCarts,createCart,getCartId,agregateProduct,deleteProduct,deleteCart} from '../../config/controllers/cart.controller.js'
import { PurchaseCompleted} from "../../config/controllers/purchase.controller.js";
import cartsModel from "../../DAO/mongo/carts/cartsModel.js";
const router = Router()

router.get('/users', async (req, res) => {
  const users = await userModel.find().lean().exec()
  res.send(users)
})

router.get('/', getCarts)

router.post('/create', createCart)

router.get("/:cid", getCartId)

//para agregar una unidad mas por la ruta
router.post("/:cid/product/:pid", agregateProduct)

router.post("/:cid/purchase", PurchaseCompleted)

router.delete("/:cid", deleteCart )

router.delete("/:cid/products/:pid", deleteProduct)

export default router
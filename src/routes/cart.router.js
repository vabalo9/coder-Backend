import {Router} from "express"

import cartManager from "../productCart.js";
const CartManager = new cartManager('cart.json');

const router = Router()

router.post("/", async (req,res)=>{
    try{
      await CartManager.newCart()
       res.send(await CartManager.newCart())
    }catch (err) {
      res.json(err);
      }
  })

  router.get("/:cid", async (req,res)=>{
      try{
        let id=  Number(req.params.cid)
        res.send(await CartManager.getProducts(id))
    }catch (err) {
      res.json(err);
      }
  })

  router.post("/:cid/product/:pid", async (req,res)=>{
    try{
      let cart=  Number(req.params.cid)
      let objectId=  Number(req.params.pid)
      res.send(await CartManager.addCart(cart, objectId))
  }catch (err) {
    res.json(err);
    }
})
export default router
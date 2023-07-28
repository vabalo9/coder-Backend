import { Router } from "express";
import cartsModel from '../../DAO/models/cartsModel.js'

const router = Router()



router.get('/', async (req, res) => {
    // .lean().exec() para que handlebars reconozca el modelo
    const carts = await cartsModel.find().lean().exec()
    res.send(carts)
})


router.post('/create', async (req,res)=>{
    const carts = await cartsModel.find().lean().exec()
    let ID;
    carts.length === 0 ? ID = 1 : ID = carts[carts.length-1].id + 1;
    const cart={id:ID, products:[]}

    const cartGenerated=new cartsModel(cart)
    await cartGenerated.save()

    res.send(cartGenerated);
})

router.get("/:cid", async (req,res)=>{
      let id=  Number(req.params.cid)
      res.send( await cartsModel.findOne({id}))
  
})

router.post("/:cid/product/:pid", async (req,res)=>{
    
      let cart=  Number(req.params.cid)
      let objectId=  Number(req.params.pid)

    const busquedaCarrito = await cartsModel.findOne({id:cart})
    const busquedaProducto = busquedaCarrito.products.findIndex((el) => el.id === objectId);
  
    if (busquedaProducto === -1) {
        busquedaCarrito.products.push({id:objectId, quantity: 1})
      await cartsModel.updateOne({ id: cart }, { $set: { products: busquedaCarrito.products } })
    } else {
      busquedaCarrito.products[busquedaProducto] = {
        id: objectId,
        quantity: busquedaCarrito.products[busquedaProducto].quantity + 1
    };
    await cartsModel.updateOne({ id: cart }, { $set: { products: busquedaCarrito.products } })
    }

    res.send( await cartsModel.findOne({id:cart}))
  
})


export default router
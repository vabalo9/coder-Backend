import { Router } from "express";
import cartsModel from '../../DAO/models/cartsModel.js'
import userModel from "../../DAO/models/user.model.js";

const router = Router()

router.get('/users', async (req, res) => {
  const users = await userModel.find().lean().exec()
  res.send(users)
})

router.get('/', async (req, res) => {
  // .lean().exec() para que handlebars reconozca el modelo
  const carts = await cartsModel.find().lean().exec()
  res.send(carts)
})


router.post('/create', async (req, res) => {
  const carts = await cartsModel.find().lean().exec()
  let ID
  carts.length === 0 ? ID = 1 : ID = carts[carts.length - 1].id + 1;
  const cart = { id: ID, products: [] }

  const cartGenerated = new cartsModel(cart)
  await cartGenerated.save()

  res.send(cartGenerated);
})

router.get("/:cid", async (req, res) => {
  let id = Number(req.params.cid)
  res.send(await cartsModel.findOne({ id }))

})

//para agregar una unidad mas por la ruta
router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid
  let objectId = req.params.pid
   const busquedaCarrito = await cartsModel.findOne({ _id: cartId })
  const busquedaProducto = busquedaCarrito.products.findIndex((el) => el._id._id == objectId);

  if (busquedaProducto === -1) {
    busquedaCarrito.products.push({ _id: objectId, quantity: 1 })
    await cartsModel.updateOne({ _id: cartId }, { $set: { products: busquedaCarrito.products } })
  } else {
    busquedaCarrito.products[busquedaProducto] = {
      id: objectId,
      quantity: busquedaCarrito.products[busquedaProducto].quantity + 1
    };
    await cartsModel.updateOne({ _id: cartId }, { $set: { products: busquedaCarrito.products } })
  }

   res.send(await cartsModel.findOne({ _id: cartId }))

})


router.delete("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid
  let objectId = req.params.pid
   const busquedaCarrito = await cartsModel.findOne({ _id: cartId })
   const busquedaProducto = busquedaCarrito.products.findIndex((el) => el.id === objectId);


  if (busquedaProducto != -1) {
    await cartsModel.updateOne(
      { _id: cartId }, 
      { $pull: { products: { _id: objectId } } }
    );
    res.send(await cartsModel.findOne({ _id: cartId }))
  } else { res.send({ 'error': 'no se encontro el producto a eliminar' }) }

})

router.put("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid
  let objectId = req.params.pid
   const busquedaCarrito = await cartsModel.findOne({ _id: cartId })
   const busquedaProducto = busquedaCarrito.products.findIndex((el) => el.id === objectId);
   let cantidad = req.body.cantidad


  if (busquedaProducto === -1) {
    busquedaCarrito.products.push({ _id: objectId, quantity: 1 })
    await cartsModel.updateOne({ _id: cartId }, { $set: { products: busquedaCarrito.products } })
  } else {
    busquedaCarrito.products[busquedaProducto] = {
      _id: objectId,
      quantity: busquedaCarrito.products[busquedaProducto].quantity = cantidad
    };
    await cartsModel.updateOne({ _id: cartId }, { $set: { products: busquedaCarrito.products } })
  }

  res.send(await cartsModel.findOne({ _id: cartId }))

})

router.delete("/:cid", async (req, res) => {
  let cart = Number(req.params.cid)
  try {
    await cartsModel.deleteOne({ id: cart })

    res.send('carrito eliminado con exito')

  } catch (err) {
    res.json(err);
  }
})

router.delete("/", async (req, res) => {
  try {
      // Elimina todos los documentos de la colección
      await cartsModel.deleteMany({});
      res.send('Todos los carritos han sido eliminados con éxito');
  } catch (err) {
      res.json(err);
  }
});







export default router
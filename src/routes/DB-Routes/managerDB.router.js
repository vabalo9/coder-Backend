import { Router } from "express"
import { productsService } from "../../repositories/index.js"

const router = Router()


router.get("/products", async (req, res) => {
  const cantidad = req.query.limit
  const products = await productsService.getProducts()
  res.send(products)


})

router.get("/products/:pid", async (req, res) => {
  let id = (req.params.pid)
  const product = await productsService.getProduct(id)

  res.send(product)

})

router.post("/products", async (req, res) => {
  let product = req.body
  const newProduct = await productsService.create(product)
  
  res.json(newProduct);

})

router.put("/products/:pid", async (req, res) => {
  const { price, stock } = req.body
  let id = req.params.pid
  const updapteProduct = await productsService.updapte(id, price, stock)
  res.send(updapteProduct)

})

router.delete("/products/:pid", async (req, res) => {
  let id = req.params.pid
  const deleteProduct = await productsService.delete(id)
  res.send(deleteProduct)

})








export default router
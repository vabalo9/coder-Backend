import {Router} from "express"

import ProductManager from "../productManager.js";
const productManager = new ProductManager('product.json');

const router = Router()



router.get("/products", async (req,res)=>{
    try{
        const products = await productManager.getProducts();
        const cantidad= req.query.limit
        if (cantidad) {
            let elementosBuscados = await products.slice(0,cantidad)
            res.send(elementosBuscados)
        }else{res.send(products)}
        
    }catch (err) {
        res.json(err);
        }
  })
  
  router.get("/products/:pid", async (req,res)=>{
    let id= Number(req.params.pid)
    try{
    const elementoBuscado = await productManager.getProductById(id)
    res.send(elementoBuscado)
  }catch (err) {
    res.json(err);
    }
  })

  router.post("/products", async (req,res)=>{
    try{
      let object = req.body
      const elementoBuscado = await productManager.addProduct(object.title, object.description, object.price, object.thumbnail, object.code, object.stock)
      res.send({estado:"elemento añadido"})
    }catch (err) {
      res.json(err);
      }
  })

  router.put("/products/:pid", async (req,res)=>{
    try{
      let object = req.body
      let id = req.params.pid
      const elementoBuscado = await productManager.updapteProduct(id, object.price, object.stock)
      res.send(elementoBuscado)
    }catch (err) {
      res.json(err);
      }
  })
  
  
  router.delete("/products/:pid", async (req,res)=>{
    try{
      let id = req.params.pid
      const elementoEliminado = await productManager.deleteProduct(id)
      res.send(elementoEliminado)
    }catch (err) {
      res.json(err);
      }
  })



  export default router
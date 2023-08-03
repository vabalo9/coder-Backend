import {Router} from "express"
import managerModel from '../DAO/models/productsModels.js'

import ProductManager from "../productManager.js";
const productManager = new ProductManager('product.json');


const router = Router()



router.get("/products", async (req,res)=>{
  const page = parseInt(req.query?.page || 1)
  const limit = parseInt(req.query.limit || 10) 
  let priceOrder = parseInt(req.query.price || 1) 
  let marca = req.query.marca || false;
  let query={}

  if (marca){
    query.marca=marca
  }
    try{
      
         let products= await managerModel.paginate(query, {
              page,
              limit,
              lean:true, //pasar a formato json
              sort: { price: priceOrder },
              customLabels: {
                docs: 'payload'
              }
          })
               products.status = "success";
               products.prevLink = products.hasPrevPage ? `/api/products/products/?page=${products.prevPage}&limit=${limit}`: null
               products.nextLink = products.hasNextPage ? `/api/products/products/?page=${products.nextPage}&limit=${limit}`: null
      res.send( products)    
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
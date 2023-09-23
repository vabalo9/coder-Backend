import {Router} from "express"
import managerModel from '../DAO/models/productsModels.js'
import { productsService } from "../repositories/index.js"

import ProductManager from "../productManager.js";
const productManager = new ProductManager('product.json');


const router = Router()



router.get("/products", async (req, res) => {
  const page = parseInt(req.query?.page || 1);
  const limit = parseInt(req.query.limit || 10);
  let priceOrder = parseInt(req.query.price || 1);
  let marca = req.query.marca || false;
  let query = {};

  if (marca) {
      query.marca = marca;
  }

  try {
      let products = await managerModel.paginate(query, {
          page,
          limit,
          lean: true, //pasar a formato json
          sort: { price: priceOrder },
          customLabels: {
              docs: 'payload'
          }
      });

      products.status = "success";
      products.prevLink = products.hasPrevPage ? `/api/products/products/?page=${products.prevPage}&limit=${limit}` : null;
      products.nextLink = products.hasNextPage ? `/api/products/products/?page=${products.nextPage}&limit=${limit}` : null;
      res.send(products);
  } catch (err) {
      res.json(err);
  }
});




router.get("/vanilla", async (req, res) => {
  let products = await productsService.getProducts()
  const page = parseInt(req.query?.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const priceOrder = parseInt(req.query.price || 1);
  const marca = req.query.marca || false;
  // Filtrar por marca si se proporciona
  let filteredProducts = marca ? products.filter(product => product.marca === marca) : products;

  // Ordenar por precio
  filteredProducts.sort((a, b) => priceOrder * (a.price - b.price));

  // Paginación
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const hasNextPage = endIndex < filteredProducts.length;
  const hasPrevPage = startIndex > 0;

  const result = {
      status: "success",
      payload: paginatedProducts,
      prevLink: hasPrevPage ? `/api/products/products/?page=${page - 1}&limit=${limit}` : null,
      nextLink: hasNextPage ? `/api/products/products/?page=${page + 1}&limit=${limit}` : null
  };

  res.send(result);
});


  
  router.get("/products/:pid", async (req,res)=>{
    let id= req.params.pid
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
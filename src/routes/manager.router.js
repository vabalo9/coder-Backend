import {Router} from "express"
import { productsService } from "../repositories/index.js"


const router = Router()







router.get("/products", async (req, res) => {
  let productsList = await productsService.getProducts()
  // Extraer parámetros o usar valores por defecto
  const page = parseInt(req.query?.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const priceOrder = parseInt(req.query.price || 1);
  const marca = req.query.marca || false;

  // Filtrar por marca si es necesario
  let filteredProducts = productsList;
  if (marca) {
      filteredProducts = productsList.filter(product => product.marca === marca);
  }

  // Ordenar por precio
  filteredProducts.sort((a, b) => priceOrder * (a.price - b.price));

  // Paginación
  let startIndex = (page - 1) * limit;
  let endIndex = startIndex + limit;
  let paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Información de paginación
  let totalDocs = filteredProducts.length;
  let totalPages = Math.ceil(totalDocs / limit);
  let pagingCounter = startIndex + 1;
  let hasPrevPage = startIndex > 0;
  let hasNextPage = endIndex < totalDocs;
  let prevPage = hasPrevPage ? page - 1 : null;
  let nextPage = hasNextPage ? page + 1 : null;

  // Construcción de los enlaces prevLink y nextLink
  let baseLink = "/api/products/products/?";
  let prevLink = hasPrevPage ? `${baseLink}page=${prevPage}&limit=${limit}` : null;
  let nextLink = hasNextPage ? `${baseLink}page=${nextPage}&limit=${limit}` : null;

  // Respuesta
  res.send( {
    payload: paginatedProducts,
      totalDocs: totalDocs,
      limit: limit,
      totalPages: totalPages,
      page: page,
      pagingCounter: pagingCounter,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
      prevPage: prevPage,
      nextPage: nextPage,
      status: "success",
      prevLink: prevLink,
      nextLink: nextLink,
  });
})





  
  router.get("/products/:pid", async (req,res)=>{
    let id= req.params.pid
    try{
    const elementoBuscado = await productsService.getProduct(id)
    res.send(elementoBuscado)
  }catch (err) {
    res.json(err);
    }
  })

  router.post("/products", async (req,res)=>{
    try{
      let object = req.body
      const elementoBuscado = await productsService.create(object)
      res.send({estado:"elemento añadido"})
    }catch (err) {
      res.json(err);
      }
  })

  router.put("/products/:pid", async (req,res)=>{
    try{
      let object = req.body
      let id = req.params.pid
      const elementoBuscado = await productsService.updapte(id, object.price, object.stock)
      res.send(elementoBuscado)
    }catch (err) {
      res.json(err);
      }
  })
  
  
  router.delete("/products/:pid", async (req,res)=>{
    try{
      let id = req.params.pid
      const elementoEliminado = await productsService.delete(id)
      res.send(elementoEliminado)
    }catch (err) {
      res.json(err);
      }
  })



  export default router
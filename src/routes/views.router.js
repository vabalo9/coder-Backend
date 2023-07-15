import { Router } from "express";
import ProductManager  from "../productManager.js";
const productManager = new ProductManager('product.json');

const router = Router()

router.get('/', (req,res)=>{
    res.render('index', {})
})

router.get('/home.handlebars', async (req,res)=>{
    const products = await productManager.getProducts();
    res.render('products', {products})
})

router.get('/form-products', async (req,res)=>{
    res.render('form', {})
})

router.get('/realtimeproducts', async (req,res)=>{
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {products})
})

router.post('/form-products', async (req,res)=>{
    const object = req.body
    await productManager.addProduct(object.title, object.description, object.price, object.thumbnail, object.code, object.stock)
    res.redirect('/home.handlebars')
})




export default router
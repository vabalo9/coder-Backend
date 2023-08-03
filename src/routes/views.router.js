import { Router } from "express";
import managerModel from '../DAO/models/productsModels.js'

const router = Router()

router.get('/', (req,res)=>{
    res.render('index', {})
})

router.get('/home.handlebars', async (req,res)=>{
    const products = await managerModel.find().lean().exec();
    res.render('products', {products})
    console.log({products})
  })

router.get('/form-products', async (req,res)=>{
    res.render('form', {})
})

router.get('/realtimeproducts', async (req,res)=>{
    const products = await managerModel.find().lean().exec();
    res.render('realTimeProducts', {products})
})

router.post('/form-products', async (req,res)=>{
    const object = req.body
    await managerModel.create( { title:object.title, id:object.id, description:object.description, price:object.price, thumbnail:object.thumbnail, code:object.code, stock:object.stock, status:true} )
    res.redirect('/home.handlebars')
})




export default router
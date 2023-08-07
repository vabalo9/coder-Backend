import { Router } from "express";
import managerModel from '../DAO/models/productsModels.js'
import cartsModel from '../DAO/models/cartsModel.js'

const router = Router()

router.get('/', (req, res) => {
    res.render('index', {})
})

router.get('/products', async (req, res) => {

    const page = parseInt(req.query?.page || 1)
    const limit = parseInt(req.query.limit || 3)
    let priceOrder = parseInt(req.query.price || 1)
    let marca = req.query.marca || false;
    let query = {}

    if (marca) {
        query.marca = marca
    }
    try {

        let products = await managerModel.paginate(query, {
            page,
            limit,
            lean: true, //pasar a formato json

        })
        products.prevLink = products.hasPrevPage ? `/products/?page=${products.prevPage}&limit=${limit}` : null
        products.nextLink = products.hasNextPage ? `/products/?page=${products.nextPage}&limit=${limit}` : null
         res.render('market', products)
    } catch (err) {
        res.json(err);
    }

})


router.get('/home.handlebars', async (req, res) => {
    const products = await managerModel.find().lean().exec();
    res.render('products', { products })
})

router.get('/form-products', async (req, res) => {
    res.render('form', {})
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await managerModel.find().lean().exec();
    res.render('realTimeProducts', { products })
})

router.post('/form-products', async (req, res) => {
    const object = req.body
    await managerModel.create({ title: object.title, id: object.id, description: object.description, price: object.price, thumbnail: object.thumbnail, code: object.code, stock: object.stock, status: true })
    res.redirect('/home.handlebars')
})

router.get('/carts/:cid', async (req,res)=>{
    let cartId = req.params.cid
    const busquedaCarrito = await cartsModel.findOne({ _id: cartId }).lean().exec();
    console.log(JSON.stringify(busquedaCarrito))
     res.render('cart', {busquedaCarrito})
    // res.send(busquedaCarrito)
})

router.get('/vacio', (req,res)=>{
    res.render('carritovacio', {})
})



export default router
import { Router } from "express";
import managerModel from '../DAO/models/productsModels.js'
import cartsModel from '../DAO/models/cartsModel.js'

const router = Router()

router.get('/check', (req, res) => {
    if(req.session?.user) {
        res.redirect('/home.handlebars')
    }

    res.render('login', {})
})

router.get('/register', (req, res) => {
    if(req.session?.user) {
        res.redirect('/home.handlebars')
    }

    res.render('register', {})
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }

        res.clearCookie('connect.sid');

        res.redirect('/check');
    });
});



function auth(req, res, next) {
    if(req.session?.user) return next()
    res.redirect('/check')
}

function profile(req,res,next) {
    if(req.session.user.rol == "admin") return next()
    res.redirect('/fail')
}

router.get('/fail', auth, (req, res) => {

    res.render('fail', {})
})

router.get('/profile', auth, (req, res) => {
    const user = req.session.user
    console.log(req.session.user)


    res.render('profile', user)
})

router.get('/', auth, (req, res) => {
    res.render('index', {})
})

router.get('/products', auth, async (req, res) => {
    console.log('este es el usuario: '+req.user.cartId)

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
         res.render('market', {
            products,
            cartId:req.user.cartId._id
        } )
    } catch (err) {
        res.json(err);
    }

})


router.get('/home.handlebars', auth, async (req, res) => {
    console.log(req.session.user.first_name)
    const products = await managerModel.find().lean().exec();
    res.render('products', { 
        products: products,
        user: req.session.user 
    });
    
})


router.get('/form-products', auth, profile, async (req, res) => {
    res.render('form', {})
})

router.get('/realtimeproducts', auth, profile, async (req, res) => {
    const products = await managerModel.find().lean().exec();
    res.render('realTimeProducts', { products })
})

router.post('/form-products', auth, async (req, res) => {
    const object = req.body
    await managerModel.create({ title: object.title, id: object.id, description: object.description, price: object.price, thumbnail: object.thumbnail, code: object.code, stock: object.stock, status: true })
    res.redirect('/home.handlebars')
})

router.get('/carts', auth, async (req,res)=>{
    let cartId = req.user.cartId
    const busquedaCarrito = await cartsModel.findOne({ _id: cartId }).lean().exec();
    //console.log(JSON.stringify(busquedaCarrito))
    if (busquedaCarrito.products.length == 0) return res.render('carritovacio', {})
        
    
     res.render('cart', {busquedaCarrito})
})

router.get('/vacio', auth, (req,res)=>{
    res.render('carritovacio', {})
})



export default router
import { Router } from "express";
import { productsService } from "../repositories/index.js"
import { cartsService } from "../repositories/index.js"

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


    res.render('profile', user)
})

router.get('/', auth, (req, res) => {
    res.render('index', {})
})





router.get('/products',  auth, async(req, res) => {
    const products = await productsService.getProducts()
    
    const page = parseInt(req.query?.page || 1);
    const limit = parseInt(req.query.limit || 3);
    let priceOrder = parseInt(req.query.price || 1);
    let marca = req.query.marca || false;

    // Filtrar productos por marca si se proporciona
    let filteredProducts = marca ? products.filter(p => p.marca === marca) : products;

    // Ordenar productos por precio
    filteredProducts.sort((a, b) => priceOrder * (a.price - b.price));

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const hasPrevPage = startIndex > 0;
    const hasNextPage = endIndex < filteredProducts.length;

    const result = {
        payload: paginatedProducts,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? `/products/?page=${page - 1}&limit=${limit}` : null,
        nextLink: hasNextPage ? `/products/?page=${page + 1}&limit=${limit}` : null
    };
    try {
        res.render('market', {
            products: result,
            cartId: req.user.cartId._id
        });
    } catch (err) {
        res.json(err);
    }

});



router.get('/home.handlebars', auth, async (req, res) => {
    const products = await productsService.getProducts()
    res.render('products', { 
        products,
        user: req.session.user 
    });
    
})


router.get('/form-products', auth, profile, async (req, res) => {
    res.render('form', {})
})

router.get('/realtimeproducts', auth, profile, async (req, res) => {
    const products = await productsService.getProducts();
    res.render('realTimeProducts', { products })
})

router.post('/form-products', auth, async (req, res) => {
    const object = req.body
    await productsService.create(object)
    res.redirect('/home.handlebars')
})




router.get('/carts', auth, async (req, res) => {
    let cartId = req.user.cartId;
    const busquedaCarrito = await cartsService.getCart(cartId);
    if (busquedaCarrito.products.length == 0) return res.render('carritovacio', {})
        
    
     res.render('cart', {busquedaCarrito})
})

router.get('/vacio', auth, (req,res)=>{
    res.render('carritovacio', {})
})



export default router
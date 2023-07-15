import express from "express"
import {Server} from "socket.io"
import managerRouter from "./routes/manager.router.js"
import cartRouter from "./routes/cart.router.js"
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
import __dirname from './utils.js'
import ProductManager from "./productManager.js"
const productManager = new ProductManager('product.json');

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/static', express.static(__dirname + '/public'))

app.use('/', viewsRouter)
app.use('/api/products/', managerRouter)

app.use("/api/carts/", cartRouter)

const httpServer = app.listen(8080)
const io = new Server (httpServer)

io.on('connection', async socket=>{
  socket.on('new-product', async data =>{
    await productManager.addProduct(data.title, data.description, data.price, data.thumbnail, data.code, data.stock)
  })

  const products= await productManager.getProducts();

  socket.emit("productos", products ) ;
  
})

//async ()=>{await productManager.getProducts()
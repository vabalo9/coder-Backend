import express from "express"
import {Server} from "socket.io"
import managerRouter from "./routes/manager.router.js"
import cartDB from "./routes/DB-Routes/cartDB.router.js"
import managerDB from "./routes/DB-Routes/managerDB.router.js"
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
import __dirname from './utils.js'
import mongoose from 'mongoose'
import managerModel from './DAO/models/productsModels.js'
import chatRouter from './routes/Chat/chat.router.js'
import chatModel from './DAO/models/mesaggesModel.js'

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//configuracion handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//archivos publicos
app.use('/static', express.static(__dirname + '/public'))

//interface
app.use('/', viewsRouter)

// rutas fyle Sistem
app.use('/api/products/', managerRouter)

//rutas mongo
app.use("/api/carts/", cartDB)
app.use('/cartDB/', cartDB)
app.use('/managerDB',managerDB )

//chat

app.use('/chat', chatRouter)



const saveMessages = async (data) => {
  const messageDoc = await chatModel.findOne();
  messageDoc.messages.push({ user: data.user, message: data.mesagge });
  await messageDoc.save();
  return messageDoc;
};

mongoose.set( 'strictQuery', false)
const URL="mongodb+srv://valentinabalo9:jD7JbCE69VsdI6Gl@cluster0.nx3owjr.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URL, {
    dbName: 'ecoomerce-CoderHouseProyect'

})

.then(()=>{
console.log('db conectada')
const httpServer= app.listen(8080, ()=>console.log("...listening"))
const io = new Server (httpServer)

io.on('connection', async socket=>{
  socket.on('new-product', async data =>{
    await managerModel.create( { title:data.title, description:data.description, price:data.price, thumbnail:data.thumbnail, code:data.code, stock:data.stock, status:true} )
  })

  const products= await managerModel.find().lean().exec();

  socket.emit("productos", products ) ;
  
})

  io.on('connection', socket=>{
    socket.on('new', name=>console.log(`${name} se acaba de conectar`))
    socket.on('mesagge', async data=>{
       io.emit('logs', await saveMessages(data))
    })
    })

httpServer.on('error', e=>console.error(e)) 

})
.catch(e=>{
    console.log("No se pudo conectar a la base de datos")
})



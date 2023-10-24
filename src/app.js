//librerias
import express from "express"
import session from 'express-session'
import {Server} from "socket.io"
import handlebars from "express-handlebars"
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import {config} from 'dotenv'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express';

config({path:'.env'})

import __dirname from './utils.js'

//enrutamientos
import managerRouter from "./routes/manager.router.js"
import cartDB from "./routes/DB-Routes/cartDB.router.js"
import managerDB from "./routes/DB-Routes/managerDB.router.js"
import viewsRouter from "./routes/views.router.js"
import managerModel from './DAO/models/productsModels.js'
import chatModel from './DAO/models/mesaggesModel.js'
import sessionRouter from './routes/session.router.js'
import initializePassport from "./config/passport.config.js"
import mocking from './routes/mocking.js'
import loggertest from './routes/logger.js'
import passport from "passport"
import EErrors from "./services/errors/enums.js"
import {logger} from './utils.js'



import errorHandler from './middlewares/errors.js'

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//configuracion handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const swagerOptions = {
  definition:{
    openapi:'3.0.1',
    info:{
      tile:'documentación proyecto backend Coderhouse',
      description:'documentacion modulo productos y carrito'
    }
  },
  apis:[`${__dirname}/docs/**/*.yaml`]
}

const specs= swaggerJSDoc(swagerOptions)
console.log(specs)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

mongoose.set( 'strictQuery', false)
const URL=process.env.URL
const dbName='login-proyect'

//config mongo session
app.use(session({
  store:MongoStore.create({
      mongoUrl:URL,
      dbName,
      mongoOptions: {
          useNewUrlParser:true,
          useUnifiedTopology:true
      },
      ttl:+process.env.TTL
  }),
  secret:process.env["SESSION-PASSWORD"],
  resave:true,
  saveUninitialized:true
}))

//configuracion passport
initializePassport()
app.use(passport.session())

//archivos publicos
app.use('/static', express.static(__dirname + '/public'))

//interface
app.use('/', viewsRouter)

// rutas fyle Sistem
app.use('/api/products/', managerRouter)

//rutas mongo
app.use("/api/carts/", cartDB) //funciona con persistencia
app.use('/managerDB',managerDB ) //funciona con persistencia
app.use('/mockingproducts', mocking)
app.use('/loggertest', loggertest)


//sesion
app.use('/api/session', sessionRouter)


app.use(errorHandler)



const saveMessages = async (data) => {
  const messageDoc = await chatModel.findOne();
  messageDoc.messages.push({ user: data.user, message: data.mesagge });
  await messageDoc.save();
  return messageDoc;
};


mongoose.connect(URL, {
    dbName: 'ecoomerce-CoderHouseProyect'

})

.then(()=>{
logger.info('db conectada')
const httpServer= app.listen(+process.env.PORT, ()=>logger.info("...listening"))
const io = new Server (httpServer)

io.on('connection', async socket=>{
  socket.on('new-product', async data =>{
    await managerModel.create( { title:data.title, description:data.description, price:data.price, thumbnail:data.thumbnail, code:data.code, stock:data.stock, status:true} )
  })

  const products= await managerModel.find().lean().exec();

  socket.emit("productos", products ) ;
  
})

  io.on('connection', socket=>{
    socket.on('new', name=>logger.info(`${name} se acaba de conectar`))
    socket.on('mesagge', async data=>{
       io.emit('logs', await saveMessages(data))
    })
    })

httpServer.on('error', e=>logger.error(e)) 

})
.catch(e=>{
    logger.fatal("No se pudo conectar a la base de datos")
})



import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { faker } from '@faker-js/faker'
import winston from 'winston'
import {config} from 'dotenv'

config({path:'.env'})

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword= (user,password)=>{
    return bcrypt.compareSync(password, user.password)
}

export const generateToken = user => {
    return jwt.sign({user}, 'secretForJWT', {expiresIn: '24h'})
}

export const extractCookie = req =>{
    return (req && req.cookies) ? req.cookies['keyCookieForJWT'] : null
}

export const generatedProduct =()=>{
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        thumbnail: faker.image.avatar(),  // Genera una URL de imagen aleatoria. Es posible que desees ajustar esto según tus necesidades.
        code: faker.finance.bic({ includeBranchCode: false }), // Genera un código alfanumérico de 5 caracteres. Ajusta según tus necesidades.
        stock: faker.number.int(123), 
        status:true   // Genera un número aleatorio hasta 100 para el stock. Ajusta según tus necesidades.
    };  
}


const customLevelOptions = {
    levels: {
        debug: 5,
        http: 4,
        info: 3,
        warning: 2,
        error: 1,
        fatal:0

    }
}


const isProd = process.env.APP_ENV
    
export const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: isProd ? 'info' : 'debug',
            //format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'error',
            //format: winston.format.simple()
        })
    ]
})


export const addLogger = (req, res, next) => {
    req.logger = logger
    
    req.logger.info(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`)

    next()
}

export default __dirname
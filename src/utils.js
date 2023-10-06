import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { faker } from '@faker-js/faker'

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

export default __dirname
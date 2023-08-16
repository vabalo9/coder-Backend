import { Router } from "express";
import UserModel from "../DAO/models/user.model.js";
import {createHash, isValidPassword} from '../utils.js'

const router = Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if(!user) {
        return res.redirect('/register')}

        if(!isValidPassword(user, password)){
            console.log('contraseña invalida')
            return res.redirect('/register')
        }

    req.session.user = user
    return res.redirect('/home.handlebars')
})

router.post('/register', async (req, res) => {
    const user = req.body
    user.password =createHash(user.password)
    await UserModel.create(user)

    return res.redirect('/')
})

export default router
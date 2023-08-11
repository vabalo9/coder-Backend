import { Router } from "express";
import UserModel from "../DAO/models/user.model.js";

const router = Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email, password })
    if(!user) {
        return res.redirect('/register')}

    req.session.user = user
    return res.redirect('/home.handlebars')
})

router.post('/register', async (req, res) => {
    const user = req.body
    await UserModel.create(user)

    return res.redirect('/')
})

export default router
import {Router} from 'express'

const router = Router()

function auth(req, res, next) {
     if(req.session?.user) return next()
     res.redirect('/check')
 }
 

router.get('/', auth, (req,res)=>{
     res.render('chat', {})
})

export default router
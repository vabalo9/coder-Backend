import { Router } from "express";
import { generatedProduct } from "../utils.js";
const router = Router()


router.get('/', async(req, res) => {
const products = []
for (let index = 0; index < 1000; index++) {
    products.push( generatedProduct())
    
}
res.send({status:'success', products})
})

export default router
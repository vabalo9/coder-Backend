import {Router} from "express"
import managerModel from '../../DAO/models/productsModels.js'

const router = Router()



router.get("/products", async (req,res)=>{
    try{
        const products =  await managerModel.find().lean().exec()
        const cantidad= req.query.limit
        if (cantidad) {
            let elementosBuscados = await managerModel.find().limit(cantidad).lean().exec()
            res.send(elementosBuscados)
        }else{res.send(products)}
        
    }catch (err) {
        res.json(err);
        }
  })
  
  router.get("/products/:pid", async (req,res)=>{
    let id=(req.params.pid)
    try{
    const elementoBuscado = await managerModel.findOne({_id:id})
    res.send(elementoBuscado)
  }catch (err) {
    res.json({status:'no se encontro el elemento buscado'});
    }
  })

  router.post("/products", async (req,res)=>{
    try{
      let object = req.body
      await managerModel.create( { title:object.title, id:object.id, description:object.description, price:object.price, thumbnail:object.thumbnail, code:object.code, stock:object.stock, status:true} )
      res.send({estado:"elemento añadido"})
    }catch (err) {
      res.json({status:'something is broken'});
      }
  })

  router.put("/products/:pid", async (req,res)=>{
    try{
      let object = req.body
      let id = req.params.pid
      await managerModel.updateOne({ _id:id }, { $set: { price:object.price, stock:object.stock } })
      const elementoBuscado = await managerModel.findOne({_id:id})

      res.send(elementoBuscado)
    }catch (err) {
      res.json(err);
      }
  })
  
  
  router.delete("/products/:pid", async (req,res)=>{
    try{
      let id = req.params.pid
      await managerModel.deleteOne({_id:id})
      res.json({status:'elemento eliminado'})
    }catch (err) {
      res.json(err);
      }
  })



  export default router
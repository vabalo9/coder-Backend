import managerModel from '../../models/productsModels.js'


export default class Products {

    constructor() {

    }

    get = async () => {
        try {
            const products = await managerModel.find().lean().exec()
            return products
            const cantidad = req.query.limit
            if (cantidad) {
                let elementosBuscados = await managerModel.find().limit(cantidad).lean().exec()
                return (elementosBuscados)
            } else { return (products) }

        } catch (err) {
            return err;
        }
    }

    async getProductById(id) {
        try {
            const elementoBuscado = await managerModel.findOne({ _id: id })
            return (elementoBuscado)
        } catch (err) {
            return ({ status: 'no se encontro el elemento buscado' });
        }
    }

    async addProduct(product) {
        try {
            const newProduct = await managerModel.create({ title:product.title, description:product.description, price:product.price, thumbnail:product.thumbnail, code:product.code, stock:product.stock, status:product.status })
            return ({ estado: "elemento añadido", newProduct })
        } catch (err) {
            console.error(err)
            return ({ status: 'something is broken', error: err });
        }
    }

    async updapteProduct(id, price, stock) {
        try {
            await managerModel.updateOne({ _id: id }, { $set: { price, stock} })
            const elementoBuscado = await managerModel.findOne({ _id: id })

            return(elementoBuscado)
        } catch (err) {
            return json(err);
        }
    }

    async deleteProduct(id){
        try{
             await managerModel.deleteOne({_id:id})
            return {status:'elemento eliminado'}
          }catch (err) {
            return (err);
            }
      }

}
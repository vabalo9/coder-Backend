import crypto from "node:crypto"

export default class ProductDTO {
    constructor(product){
         this.title = product.title;
         this.description = product.description;
         this.price = product?.price ?? 5000;
         this.thumbnail = product.thumbnail;
         this.code = product.code;
         this.stock = product.stock;
         this.id = crypto.randomUUID();  
         this.status = true;
    }
}

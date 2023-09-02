let botones = document.getElementsByClassName("btn-primary")
let enlace = document.getElementById('enlace');
const cartId= document.getElementById('cartId').value
console.log(cartId)
    for (const boton of botones) {
     boton.addEventListener("click", (e)=>{
      fetch(`http://127.0.0.1:8080/api/carts/${cartId}/product/${e.target.id}`, {
    method: 'POST', 
})
.then(response => response.json()) 
.then(data => console.log(data)) 
.catch((error) => {
  console.error('Error:', error);
});
     })
    }

   








 

let botones = document.getElementsByClassName("btn-primary")
let enlace = document.getElementById('enlace');
const cartId= document.getElementById('cartId').value
const purchase = document.getElementById('purchase')
    for (const boton of botones) {
     boton.addEventListener("click", (e)=>{
      fetch(`http://127.0.0.1:8080/api/carts/${cartId}/product/${e.target.id}`, {
    method: 'POST', 
})
.then(response => response.json()) 
.then(data => console.log(data),
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Producto añadido al carrito',
  showConfirmButton: false,
  timer: 1500
})
) 
.catch((error) => {
  console.error('Error:', error);
});
     })
    }

 








 

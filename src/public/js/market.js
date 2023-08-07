let botones = document.getElementsByClassName("btn-primary")
let enlace = document.getElementById('enlace');


let carCode

const newCar=()=>{
  fetch(`http://127.0.0.1:8080/api/carts/create`, {
    method: 'POST', 
})
.then(response => response.json()) 
.then(data => carCode=data._id) 
.then(() => enlace.innerHTML = `<a href='http://127.0.0.1:8080/carts/${carCode}'><i class="bi bi-cart3"></i></a>'`)

.catch((error) => {
  console.error('Error:', error);
});
}

newCar()

    for (const boton of botones) {
     boton.addEventListener("click", (e)=>{
      fetch(`http://127.0.0.1:8080/api/carts/${carCode}/product/${e.target.id}`, {
    method: 'POST', 
})
.then(response => response.json()) 
.then(data => console.log(data)) 
.catch((error) => {
  console.error('Error:', error);
});

     })

    
    }

   








    for (let boton of botones) {
     boton.addEventListener("click", (e)=>{

      console.log("evento activado")

      if (localStorage.getItem('cart') || localStorage.getItem('cart') === false) {
        // Hay algo almacenado en 'cart'
        cartCode = localStorage.getItem('cart');
    } else {
        // No hay nada almacenado en 'cart'
        newCar();
    }
      
      console.log(cartCode)


      fetch(`http://127.0.0.1:8080/api/carts/${cartCode}/product/${e.target.id}`, {
    method: 'POST', 
})
.then(response => response.json()) 
.then(data => console.log(data)) 
.catch((error) => {
  console.error('Error:', error);
});

     })

    
    }

   


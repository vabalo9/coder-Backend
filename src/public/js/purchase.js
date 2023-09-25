const cartId = document.getElementById("cartId").value;

const purchase = document.getElementById('purchase')



    purchase.addEventListener("click", ()=>{
      fetch(`http://127.0.0.1:8080/api/carts/${cartId}/purchase`, {
    method: 'POST',
    
    }, alert("desde aca ya se hizo todo"))
    .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  })
   








 

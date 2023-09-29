const cartId = document.getElementById("cartId").value;

const purchase = document.getElementById('purchase')

function listProducts(products) {
  // Si el array está vacío, devuelve una cadena vacía
  if (products.length === 0) return '';

  // Si solo hay un producto, devuelve su título
  if (products.length === 1) return products[0].title;

  // Si hay dos productos, los une con un "y"
  if (products.length === 2) return `${products[0].title} y ${products[1].title}`;

  // Si hay más de dos productos:
  const lastProduct = products.pop();       // Obtiene el último producto
  const secondToLastProduct = products.pop(); // Obtiene el penúltimo producto

  // Une los títulos de los productos restantes con comas, y añade los dos últimos con un "y"
  return `${products.map(p => p.title).join(', ')}, ${secondToLastProduct.title} y ${lastProduct.title}`;
}





purchase.addEventListener("click", ()=>{
  fetch(`http://127.0.0.1:8080/api/carts/${cartId}/purchase`, { method: 'POST' })
  .then(response => response.json())
  .then(data => {
    if (data.failedOrder.length > 0 ) {
    Swal.fire({
      title: `Los productos ${listProducts(data.failedOrder)} no cuentan con el stock suficiente para tu compra, 
      deseas continuar con el resto de productos?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Realizar compra!',
      denyButtonText: `Volver al carrito`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('En seguida te mostraremos tu comprobante', '', 'success')
        window.location.href = data.redirect;
      } 
    })
  }else{
    window.location.href = data.redirect;
  }
      
      
  })
  .catch(error => console.error('Error:', error));
});
   








 

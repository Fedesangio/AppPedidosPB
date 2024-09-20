const productos = [
  { nombre: "Clásico Choco", precio: 100, imagen: "https://www.alfajorespuntaballena.com/wp-content/uploads/2023/06/1-Cla%CC%81sico-choco-48g.png" },
  { nombre: "Clásico Nieve", precio: 95, imagen: "https://www.alfajorespuntaballena.com/wp-content/uploads/2023/06/2-Cla%CC%81sico-nieve-35g.png" },
  { nombre: "Arrolate Limón", precio: 90, imagen: "https://www.alfajorespuntaballena.com/wp-content/uploads/2023/06/11-arrolate-limon-28g.png" },
  { nombre: "Bocadito Negro", precio: 85, imagen: "https://www.alfajorespuntaballena.com/wp-content/uploads/2023/09/bocadito-negro-27.jpg" }
];

let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(index) {
  const productoSeleccionado = productos[index];
  const existeProducto = carrito.find(p => p.nombre === productoSeleccionado.nombre);

  if (existeProducto) {
    existeProducto.cantidad += 1;
  } else {
    carrito.push({ ...productoSeleccionado, cantidad: 1 });
  }
  
  mostrarCarrito();
}

// Función para generar tarjetas de productos
function generarTarjetas() {
  const container = document.getElementById('products-container');
  container.innerHTML = ''; // Limpia el contenedor antes de generar tarjetas

  productos.forEach((producto, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h2>${producto.nombre}</h2>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar al pedido</button>
    `;
    
    container.appendChild(card);
  });
}

generarTarjetas ()

// Función para mostrar el carrito de compras
function mostrarCarrito() {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('total-price');
  cartContainer.innerHTML = '';

  let total = 0;
  
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
    const item = document.createElement('p');
    item.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio * producto.cantidad}`;
    cartContainer.appendChild(item);
  });
  
  totalContainer.textContent = `Total: $${total}`;
}

// Función para finalizar el pedido y guardar los datos necesarios
document.getElementById('finalize-order').addEventListener('click', () => {
  const nombreCliente = document.getElementById('customer-name').value;
  const fechaEntrega = document.getElementById('delivery-date').value;
  
  if (nombreCliente === '') {
    alert('Por favor ingresa el nombre del cliente.');
    return;
  }

  const nota = document.getElementById('customer-note').value;
  const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
  
  if (total === 0) {
    alert('El carrito está vacío.');
    return;
  }

  const pedido = {
    cliente: nombreCliente,
    productos: carrito.map(({ nombre, cantidad }) => ({ nombre, cantidad })),
    total: total,
    nota: nota,
    fechaEntrega: fechaEntrega
  };
  
  // Guardar en localStorage
  localStorage.setItem('pedido', JSON.stringify(pedido));
  alert('Pedido guardado con éxito para ' + nombreCliente);

  // Limpiar el formulario y el carrito
  carrito = [];
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-note').value = '';
  document.getElementById('delivery-date').value = '';
  mostrarCarrito();
});
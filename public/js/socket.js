const socket = io();

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombreProducto = document.getElementById('nombreProducto').value;
  socket.emit('crearProducto', { nombre: nombreProducto });
});

socket.on('actualizarProductos', (productos) => {
  console.log('Lista de productos actualizada:', productos);
});

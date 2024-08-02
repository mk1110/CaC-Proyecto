import {API_PINTURERIA} from './config.js';
document.getElementById('IngresosForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const productoId = document.getElementById('productoId').value; // Obtener el ID del producto (si está en modo edición)
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const imagen = document.getElementById('imagenProducto').files[0];

  let formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('precio',precio);
  formData.append('imagen', imagen);

  let url = `${API_PINTURERIA}/producto`;//Hay que ver el nombre
  let method = 'POST';

  if (productoId) {
    // Si hay un ID de producto, estamos en modo edición
    url += `/${productoId}`;
    method = 'PUT'; // Usar el método PUT para actualizar el producto existente

  }

  fetch(url, {
    method: method,
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadProductos(); // Recarga la lista de productos después de agregar una nueva
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al agregar el producto.';
    console.error('Error:', error);
  });
})


function loadProductos() {
  fetch(`${API_PINTURERIA}/producto`)
    .then(response => response.json())
    .then(data => {
      const productoList = document.getElementById('productoList');
      productoList.innerHTML = ''; // Limpiar la lista existente

      data.forEach(producto => {
        const productoItem = document.createElement('li');
        productoItem.innerHTML = `
          <span>${producto.nombre} (${producto.precio})</span>
          <div>
            <button onclick="editProducto(${producto.id_producto })">Editar</button>
            <button onclick="deleteProducto(${producto.id_producto})">Borrar</button>
          </div>
        `;
        productoList.appendChild(productoItem);
      });
    })
    .catch( error => {
      console.error('Error al cargar los productos:',error);
 } );
}

window.deleteProductos = (id) => {
  fetch(`${API_PINTURERIA}/product/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadProductos(); // Recarga la lista de productos después de borrar una
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al borrar el producto.';
    console.error('Error:', error);
  });
}

// Usar función flecha para editar el producto y asignarle al objeto window
window.editProducto = (id) => {
  // Obtener el producto por su ID y cargar los datos en el formulario
  fetch(`${API_PINTURERIA}/product/${id}`)
    .then(response => response.json())
    .then(producto => { /////ver el nombre si esta bien
      // Llenar el formulario con los datos de los productos
      document.getElementById('productoId').value = movie.id_product;
      document.getElementById('nombre').value = producto.nombre;
      document.getElementById('precio').value = producto.precio;
      document.getElementById('btnSave').innerText = 'Guardar Cambios';

      
    })
    .catch(error => {
      console.error('Error al obtener el producto para editar:', error);
    });
};

// Función para limpiar el formulario después de guardar cambios o cancelar
const clearForm = () => {
  document.getElementById('productoId').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('precio').value = '';
  

  // Restaurar el texto original del botón de submit
  document.querySelector('button[type="submit"]').innerText = 'Agregar Producto';
};

// Cancelar la edición y limpiar el formulario al hacer clic en "Cancelar"
document.getElementById('cancelEdit').addEventListener('click', clearForm);

// Cargar los productos cuando la página se cargue por primera vez
document.addEventListener('DOMContentLoaded', loadProductos);

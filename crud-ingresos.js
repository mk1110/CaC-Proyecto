//import { API_PINTURERIA } from './config.js';

document.getElementById('IngresosForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const productId = document.getElementById('productId').value; // Obtener el ID del producto (si está en modo edición)
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const imagen = document.getElementById('imagenProducto').files[0];

  let formData = new FormData();
  formData.append('name', name);
  formData.append('price',price);
  formData.append('imagen', imagen);

  let url = `${API_PINTURERIA }/producto`;//Hay que ver el nombre
  let method = 'POST';

  if (productId) {
    // Si hay un ID de producto, estamos en modo edición
    url += `/${productId}`;
    method = 'PUT'; // Usar el método PUT para actualizar la película existente

  }

  fetch(url, {
    method: method,
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadMovies(); // Recarga la lista de productos después de agregar una nueva
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al agregar la película.';
    console.error('Error:', error);
  });
});


function loadMovies() {
  fetch(`${API_PINTURERIA }/product`)
    .then(response => response.json())
    .then(data => {
      const productList = document.getElementById('productList');
      productList.innerHTML = ''; // Limpiar la lista existente

      data.forEach(movie => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
          <span>${product.name} (${product.price})</span>
          <div>
            <button onclick="editProduct(${product.id_product })">Editar</button>
            <button onclick="deleteProduct(${product.id_product})">Borrar</button>
          </div>
        `;
        productList.appendChild( productItem);
      });
    })
    .catch(error => {
      console.error('Error al cargar las películas:', error);
    });
}

window.deleteMovie = (id) => {
  fetch(`${API_PINTURERIA }/product/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadMovies(); // Recarga la lista de productos después de borrar una
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al borrar el producto.';
    console.error('Error:', error);
  });
}

// Usar función flecha para editar el producto y asignarle al objeto window
window.editMovie = (id) => {
  // Obtener el producto por su ID y cargar los datos en el formulario
  fetch(`${API_PINTURERIA }/product/${id}`)
    .then(response => response.json())
    .then(Product => { /////ver el nombre si esta bien
      // Llenar el formulario con los datos de los productos
      document.getElementById('productId').value = movie.id_product;
      document.getElementById('name').value = movie.name;
      document.getElementById('price').value = movie.price;
      document.getElementById('btnSave').innerText = 'Guardar Cambios';

      
    })
    .catch(error => {
      console.error('Error al obtener la película para editar:', error);
    });
};

// Función para limpiar el formulario después de guardar cambios o cancelar
const clearForm = () => {
  document.getElementById('productId').value = '';
  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  

  // Restaurar el texto original del botón de submit
  document.querySelector('button[type="submit"]').innerText = 'Agregar Producto';
};

// Cancelar la edición y limpiar el formulario al hacer clic en "Cancelar"
document.getElementById('cancelEdit').addEventListener('click', clearForm);

// Cargar los productos cuando la página se cargue por primera vez
document.addEventListener('DOMContentLoaded', loadMovies);
